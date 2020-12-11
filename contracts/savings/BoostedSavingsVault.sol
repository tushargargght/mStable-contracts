pragma solidity 0.5.16;

// Internal
import { RewardsDistributionRecipient } from "../rewards/RewardsDistributionRecipient.sol";
import { BoostedTokenWrapper } from "./BoostedTokenWrapper.sol";

// Libs
import { IERC20, SafeERC20 } from "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import { SafeCast } from "@openzeppelin/contracts/utils/SafeCast.sol";
import { StableMath, SafeMath } from "../shared/StableMath.sol";

/**
 * @title  BoostedSavingsVault
 * @author Stability Labs Pty. Ltd.
 * @notice Accrues rewards second by second, based on a users boosted balance
 * @dev    Forked from rewards/staking/StakingRewards.sol
 *         Changes:
 *          - Lockup implemented in `updateReward` hook (20% unlock immediately, 80% locked for 6 months)
 *          - `updateBoost` hook called after every external action to reset a users boost
 *          - Struct packing of common data
 *          - Searching for and claiming of unlocked rewards
 */
contract BoostedSavingsVault is BoostedTokenWrapper, RewardsDistributionRecipient {

    using StableMath for uint256;
    using SafeCast for uint256;

    event RewardAdded(uint256 reward);
    event Staked(address indexed user, uint256 amount, address payer);
    event Withdrawn(address indexed user, uint256 amount);
    event Poked(address indexed user);
    event RewardPaid(address indexed user, uint256 reward);

    IERC20 public rewardsToken;

    uint64 public constant DURATION = 7 days;
    // Length of token lockup, after rewards are earned
    uint256 public constant LOCKUP = 26 weeks;
    // Percentage of earned tokens unlocked immediately
    uint64 public constant UNLOCK = 2e17;

    // Timestamp for current period finish
    uint256 public periodFinish = 0;
    // RewardRate for the rest of the PERIOD
    uint256 public rewardRate = 0;
    // Last time any user took action
    uint256 public lastUpdateTime = 0;
    // Ever increasing rewardPerToken rate, based on % of total supply
    uint256 public rewardPerTokenStored = 0;
    mapping(address => UserData) public userData;
    // Locked reward tracking
    mapping(address => Reward[]) public userRewards;
    mapping(address => uint64) public userClaim;

    struct UserData {
        uint128 rewardPerTokenPaid;
        uint128 rewards;
        uint64 lastAction;
    }

    struct Reward {
        uint64 start;
        uint64 finish;
        uint128 rate;
    }


    // TODO - add constants to bytecode at deployTime to reduce SLOAD cost
    /** @dev StakingRewards is a TokenWrapper and RewardRecipient */
    constructor(
        address _nexus, // constant
        address _stakingToken, // constant
        address _stakingContract, // constant
        address _rewardsToken, // constant
        address _rewardsDistributor
    )
        public
        RewardsDistributionRecipient(_nexus, _rewardsDistributor)
        BoostedTokenWrapper(_stakingToken, _stakingContract)
    {
        rewardsToken = IERC20(_rewardsToken);
    }

    /**
     * @dev Updates the reward for a given address, before executing function.
     * Locks 80% of new rewards up for 6 months, vesting linearly from (time of last action + 6 months) to
     * (now + 6 months). This allows rewards to be distributed close to how they were accrued, as opposed
     * to locking up for a flat 6 months from the time of this fn call (allowing more passive accrual).
     */
    modifier updateReward(address _account) {
        uint256 currentTime = block.timestamp;
        uint64 currentTime64 = SafeCast.toUint64(currentTime);

        // Setting of global vars
        (uint256 newRewardPerToken, uint256 lastApplicableTime) = _rewardPerToken();
        // If statement protects against loss in initialisation case
        if(newRewardPerToken > 0) {

            rewardPerTokenStored = newRewardPerToken;
            lastUpdateTime = lastApplicableTime;

            // Setting of personal vars based on new globals
            if (_account != address(0)) {

                UserData memory data = userData[_account];
                uint256 earned = _earned(_account, data.rewardPerTokenPaid, newRewardPerToken);

                if(earned > 0){

                    uint256 unlocked = earned.mulTruncate(UNLOCK);
                    uint256 locked = earned.sub(unlocked);

                    userRewards[_account].push(Reward({
                        start: SafeCast.toUint64(LOCKUP.add(data.lastAction)),
                        finish: SafeCast.toUint64(LOCKUP.add(currentTime)),
                        rate: SafeCast.toUint128(locked.div(currentTime.sub(data.lastAction)))
                    }));

                    userData[_account] = UserData({
                        rewardPerTokenPaid: SafeCast.toUint128(newRewardPerToken),
                        rewards: SafeCast.toUint128(unlocked.add(data.rewards)),
                        lastAction: currentTime64
                    });
                } else {
                    userData[_account] = UserData({
                        rewardPerTokenPaid: SafeCast.toUint128(newRewardPerToken),
                        rewards: data.rewards,
                        lastAction: currentTime64
                    });
                }
            }
        } else if(_account == address(0)) {
            // This should only be hit once, for first staker in initialisation case
            userData[_account].lastAction = currentTime64;
        }
        _;
    }

    /** @dev Updates the reward for a given address, before executing function */
    modifier updateBoost(address _account) {
        _;
        _setBoost(_account);
    }

    /***************************************
                ACTIONS - EXTERNAL
    ****************************************/

    /**
     * @dev Stakes a given amount of the StakingToken for the sender
     * @param _amount Units of StakingToken
     */
    function stake(uint256 _amount)
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        _stake(msg.sender, _amount);
    }

    /**
     * @dev Stakes a given amount of the StakingToken for a given beneficiary
     * @param _beneficiary Staked tokens are credited to this address
     * @param _amount      Units of StakingToken
     */
    function stake(address _beneficiary, uint256 _amount)
        external
        updateReward(_beneficiary)
        updateBoost(_beneficiary)
    {
        _stake(_beneficiary, _amount);
    }

    /**
     * @dev Withdraws stake from pool and claims any unlocked rewards.
     * Note, this function is costly - the args for _claimRewards
     * should be determined off chain and then passed to other fn
     */
    function exit()
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        _withdraw(rawBalanceOf(msg.sender));
        (uint256 first, uint256 last) = _unclaimedEpochs(msg.sender);
        _claimRewards(first, last);
    }

    /**
     * @dev Withdraws stake from pool and claims any unlocked rewards.
     * @param _first    Index of the first array element to claim
     * @param _last     Index of the last array element to claim
     */
    function exit(uint256 _first, uint256 _last)
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        _withdraw(rawBalanceOf(msg.sender));
        _claimRewards(_first, _last);
    }

    /**
     * @dev Withdraws given stake amount from the pool
     * @param _amount Units of the staked token to withdraw
     */
    function withdraw(uint256 _amount)
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        _withdraw(_amount);
    }

    /**
     * @dev Claims all unlocked rewards for sender.
     * Note, this function is costly - the args for _claimRewards
     * should be determined off chain and then passed to other fn
     */
    function claimRewards()
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        (uint256 first, uint256 last) = _unclaimedEpochs(msg.sender);

        _claimRewards(first, last);
    }

    /**
     * @dev Claims all unlocked rewards for sender. Both immediately unlocked
     * rewards and also locked rewards past their time lock.
     * @param _first    Index of the first array element to claim
     * @param _last     Index of the last array element to claim
     */
    function claimRewards(uint256 _first, uint256 _last)
        external
        updateReward(msg.sender)
        updateBoost(msg.sender)
    {
        _claimRewards(_first, _last);
    }

    /**
     * @dev Pokes a given account to reset the boost
     */
    function pokeBoost(address _account)
        external
        updateReward(_account)
        updateBoost(_account)
    {
        emit Poked(_account);
    }

    /***************************************
                ACTIONS - INTERNAL
    ****************************************/

    /**
     * @dev Claims all unlocked rewards for sender. Both immediately unlocked
     * rewards and also locked rewards past their time lock.
     * @param _first    Index of the first array element to claim
     * @param _last     Index of the last array element to claim
     */
    function _claimRewards(uint256 _first, uint256 _last)
        internal
    {
        uint256 currentTime = block.timestamp;

        uint256 unclaimed = _unclaimedRewards(msg.sender, _first, _last);
        userClaim[msg.sender] = uint64(currentTime);

        uint256 unlocked = userData[msg.sender].rewards;
        userData[msg.sender].rewards = 0;

        uint256 total = unclaimed.add(unlocked);

        rewardsToken.safeTransfer(msg.sender, total);

        emit RewardPaid(msg.sender, total);
    }

    /**
     * @dev Internally stakes an amount by depositing from sender,
     * and crediting to the specified beneficiary
     * @param _beneficiary Staked tokens are credited to this address
     * @param _amount      Units of StakingToken
     */
    function _stake(address _beneficiary, uint256 _amount)
        internal
    {
        require(_amount > 0, "Cannot stake 0");
        _stakeRaw(_beneficiary, _amount);
        emit Staked(_beneficiary, _amount, msg.sender);
    }

    /**
     * @dev Withdraws raw units from the sender
     * @param _amount      Units of StakingToken
     */
    function _withdraw(uint256 _amount)
        internal
    {
        require(_amount > 0, "Cannot withdraw 0");
        _withdrawRaw(_amount);
        emit Withdrawn(msg.sender, _amount);
    }


    /***************************************
                    GETTERS
    ****************************************/

    /**
     * @dev Gets the RewardsToken
     */
    function getRewardToken()
        external
        view
        returns (IERC20)
    {
        return rewardsToken;
    }

    /**
     * @dev Gets the last applicable timestamp for this reward period
     */
    function lastTimeRewardApplicable()
        public
        view
        returns (uint256)
    {
        return StableMath.min(block.timestamp, periodFinish);
    }

    /**
     * @dev Calculates the amount of unclaimed rewards per token since last update,
     * and sums with stored to give the new cumulative reward per token
     * @return 'Reward' per staked token
     */
    function rewardPerToken()
        public
        view
        returns (uint256)
    {
        (uint256 rewardPerToken_, ) = _rewardPerToken();
        return rewardPerToken_;
    }

    function _rewardPerToken()
        internal
        view
        returns (uint256 rewardPerToken_, uint256 lastTimeRewardApplicable_)
    {
        uint256 lastApplicableTime = lastTimeRewardApplicable(); // + 1 SLOAD
        uint256 timeDelta = lastApplicableTime.sub(lastUpdateTime); // + 1 SLOAD
        // If this has been called twice in the same block, shortcircuit to reduce gas
        if(timeDelta == 0) {
            return (rewardPerTokenStored, lastApplicableTime);
        }
        // new reward units to distribute = rewardRate * timeSinceLastUpdate
        uint256 rewardUnitsToDistribute = rewardRate.mul(timeDelta); // + 1 SLOAD
        uint256 supply = totalSupply(); // + 1 SLOAD
        // If there is no StakingToken liquidity, avoid div(0)
        // If there is nothing to distribute, short circuit
        if (supply == 0 || rewardUnitsToDistribute == 0) {
            return (rewardPerTokenStored, lastApplicableTime);
        }
        // new reward units per token = (rewardUnitsToDistribute * 1e18) / totalTokens
        uint256 unitsToDistributePerToken = rewardUnitsToDistribute.divPrecisely(supply);
        // return summed rate
        return (rewardPerTokenStored.add(unitsToDistributePerToken), lastApplicableTime); // + 1 SLOAD
    }

    /**
     * @dev Returned the units of IMMEDIATELY claimable rewards a user has to receive. Note - this
     * does NOT include the majority of rewards which will be locked up.
     * @param _account User address
     * @return Total reward amount earned
     */
    function earned(address _account)
        public
        view
        returns (uint256)
    {
        uint256 newEarned = _earned(_account, userData[_account].rewardPerTokenPaid, rewardPerToken());
        uint256 immediatelyUnlocked = newEarned.mulTruncate(UNLOCK);
        return immediatelyUnlocked.add(userData[_account].rewards);
    }

    /**
     * @dev Calculates all unclaimed reward data, finding both immediately unlocked rewards
     * and those that have passed their time lock.
     * @param _account User address
     * @return amount Total units of unclaimed rewards
     * @return first Index of the first userReward that has unlocked
     * @return last Index of the last userReward that has unlocked
     */
    function unclaimedRewards(address _account)
        external
        view
        returns (uint256 amount, uint256 first, uint256 last)
    {
        (first, last) = _unclaimedEpochs(_account);
        amount = _unclaimedRewards(_account, first, last).add(earned(_account));
    }

    /** @dev Returns only the most recently earned rewards */
    function _earned(address _account, uint256 _userRewardPerTokenPaid, uint256 _currentRewardPerToken)
        internal
        view
        returns (uint256)
    {
        // current rate per token - rate user previously received
        uint256 userRewardDelta = _currentRewardPerToken.sub(_userRewardPerTokenPaid); // + 1 SLOAD
        // Short circuit if there is nothing new to distribute
        if(userRewardDelta == 0){
            return 0;
        }
        // new reward = staked tokens * difference in rate
        uint256 userNewReward = balanceOf(_account).mulTruncate(userRewardDelta); // + 1 SLOAD
        // add to previous rewards
        return userNewReward;
    }

    /**
     * @dev Gets the first and last indexes of array elements containing unclaimed rewards
     */
    function _unclaimedEpochs(address _account)
        internal
        view
        returns (uint256 first, uint256 last)
    {
        uint64 lastClaim = userClaim[_account];

        uint256 firstUnclaimed = _findFirstUnclaimed(lastClaim, _account);
        uint256 lastUnclaimed = _findLastUnclaimed(_account);

        return (firstUnclaimed, lastUnclaimed);
    }

    /**
     * @dev Sums the cumulative rewards from a valid range
     */
    function _unclaimedRewards(address _account, uint256 _first, uint256 _last)
        internal
        view
        returns (uint256 amount)
    {
        uint256 currentTime = block.timestamp;
        uint64 lastClaim = userClaim[_account];

        uint256 count = _last.sub(_first);
        // Check for no rewards unlocked
        if(_first == 0 && _last == 0) {
            uint256 totalLen = userRewards[_account].length;
            if(totalLen == 0 || currentTime <= userRewards[_account][0].start){
                return 0;
            }
        }

        for(uint256 i = 0; i < count; i++){

            uint256 id = _first.add(i);
            Reward memory rwd = userRewards[_account][id];

            require(currentTime >= rwd.start, "Must have started");
            require(lastClaim <= rwd.finish, "Must be unclaimed");

            uint256 endTime = StableMath.min(rwd.finish, currentTime);
            uint256 startTime = StableMath.max(rwd.start, lastClaim);
            uint256 unclaimed = endTime.sub(startTime).mul(rwd.rate);

            amount = amount.add(unclaimed);
        }
    }


    /**
     * @dev Uses binarysearch to find the unclaimed lockups for a given account
     */
    function _findFirstUnclaimed(uint64 _lastClaim, address _account)
        internal
        view
        returns(uint256 first)
    {
        uint256 len = userRewards[_account].length;
        if(len == 0) return 0;
        // Binary search
        uint256 min = 0;
        uint256 max = len - 1;
        // Will be always enough for 128-bit numbers
        for(uint256 i = 0; i < 128; i++){
            if (min >= max)
                break;
            uint256 mid = (min.add(max).add(1)).div(2);
            if (_lastClaim > userRewards[_account][mid].start){
                min = mid;
            } else {
                max = mid.sub(1);
            }
        }
        return min;
    }

    /**
     * @dev Uses binarysearch to find the unclaimed lockups for a given account
     */
    function _findLastUnclaimed(address _account)
        internal
        view
        returns(uint256 first)
    {
        uint256 len = userRewards[_account].length;
        if(len == 0) return 0;
        // Binary search
        uint256 min = 0;
        uint256 max = len - 1;
        // Will be always enough for 128-bit numbers
        for(uint256 i = 0; i < 128; i++){
            if (min >= max)
                break;
            uint256 mid = (min.add(max).add(1)).div(2);
            if (now > userRewards[_account][mid].start){
                min = mid;
            } else {
                max = mid.sub(1);
            }
        }
        return min;
    }

    /***************************************
                    ADMIN
    ****************************************/

    /**
     * @dev Notifies the contract that new rewards have been added.
     * Calculates an updated rewardRate based on the rewards in period.
     * @param _reward Units of RewardToken that have been added to the pool
     */
    function notifyRewardAmount(uint256 _reward)
        external
        onlyRewardsDistributor
        updateReward(address(0))
    {
        require(_reward < 1e24, "Cannot notify with more than a million units");

        uint256 currentTime = block.timestamp;
        // If previous period over, reset rewardRate
        if (currentTime >= periodFinish) {
            rewardRate = _reward.div(DURATION);
        }
        // If additional reward to existing period, calc sum
        else {
            uint256 remaining = periodFinish.sub(currentTime);
            uint256 leftover = remaining.mul(rewardRate);
            rewardRate = _reward.add(leftover).div(DURATION);
        }

        lastUpdateTime = currentTime;
        periodFinish = currentTime.add(DURATION);

        emit RewardAdded(_reward);
    }
}