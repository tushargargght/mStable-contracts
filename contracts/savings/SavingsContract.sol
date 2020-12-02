pragma solidity 0.5.16;

// External
import { ISavingsManager } from "../interfaces/ISavingsManager.sol";

// Internal
import { ISavingsContract } from "../interfaces/ISavingsContract.sol";
import { Module } from "../shared/Module.sol";
import { AbstractStakingRewards } from "./AbstractStakingRewards.sol";

// Libs
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20Detailed } from "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import { SafeMath } from "@openzeppelin/contracts/math/SafeMath.sol";
import { StableMath } from "../shared/StableMath.sol";



contract SavingsCredit is IERC20, ERC20Detailed, AbstractStakingRewards {

    using SafeMath for uint256;

    // Total number of savings credits issued
    uint256 internal _totalCredits;

    // Amount of credits for each saver
    mapping(address => uint256) internal _creditBalances;
    mapping(address => mapping(address => uint256)) private _allowances;

    constructor(address _nexus, address _rewardToken, address _distributor, string memory _nameArg, string memory _symbolArg, uint8 _decimalsArg)
        internal
        ERC20Detailed(
            _nameArg,
            _symbolArg,
            _decimalsArg
        )
        AbstractStakingRewards(
            _nexus,
            _rewardToken,
            _distributor
        )
    {
        
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function totalSupply() public view returns (uint256) {
        return _totalCredits;
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function balanceOf(address account) public view returns (uint256) {
        return _creditBalances[account];
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(msg.sender, recipient, amount);
        return true;
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(msg.sender, spender, amount);
        return true;
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, msg.sender, _allowances[sender][msg.sender].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].add(addedValue));
        return true;
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(msg.sender, spender, _allowances[msg.sender][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    // @Modification - 2 things must be done on a transfer
    // 1 - Accrue Rewards for both sender and recipient
    // 2 - Update 'power' of each participant AFTER
    function _transfer(address sender, address recipient, uint256 amount)
        internal
        updateRewards(sender, recipient)
        // updatePowers(sender, recipient)
    {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _creditBalances[sender] = _creditBalances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _creditBalances[recipient] = _creditBalances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    // @Modification - 2 things must be done on a mint
    // 1 - Accrue Rewards for account
    // 2 - Update 'power' of the participant AFTER
    function _mint(address account, uint256 amount)
        internal
        updateReward(account)
        updatePower(account)
    {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalCredits = _totalCredits.add(amount);
        _creditBalances[account] = _creditBalances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    // @Modification - 2 things must be done on a mint
    // 1 - Accrue Rewards for account
    // 2 - Update 'power' of the participant AFTER
    function _burn(address account, uint256 amount)
        internal
        updateReward(account)
        updatePower(account)
    {
        require(account != address(0), "ERC20: burn from the zero address");

        _creditBalances[account] = _creditBalances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalCredits = _totalCredits.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    /** Ported straight from OpenZeppelin ERC20 */
    function _approve(address owner, address spender, uint256 amount) internal {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}

/**
 * @title   SavingsContract
 * @author  Stability Labs Pty. Ltd.
 * @notice  Savings contract uses the ever increasing "exchangeRate" to increase
 *          the value of the Savers "credits" relative to the amount of additional
 *          underlying collateral that has been deposited into this contract ("interest")
 * @dev     VERSION: 2.0
 *          DATE:    2020-11-28
 */
contract SavingsContract is ISavingsContract, SavingsCredit {

    using SafeMath for uint256;
    using StableMath for uint256;

    // Core events for depositing and withdrawing
    event ExchangeRateUpdated(uint256 newExchangeRate, uint256 interestCollected);
    event SavingsDeposited(address indexed saver, uint256 savingsDeposited, uint256 creditsIssued);
    event CreditsRedeemed(address indexed redeemer, uint256 creditsRedeemed, uint256 savingsCredited);
    event AutomaticInterestCollectionSwitched(bool automationEnabled);

    // Amount of underlying savings in the contract
    // uint256 public totalSavings;

    // Rate between 'savings credits' and underlying
    // e.g. 1 credit (1e17) mulTruncate(exchangeRate) = underlying, starts at 10:1
    // exchangeRate increases over time and is essentially a percentage based value
    uint256 public exchangeRate = 1e17;

    // Underlying asset is underlying
    IERC20 public underlying;
    bool private automateInterestCollection = true;

    // TODO - use constant addresses during deployment. Adds to bytecode
    constructor(
            address _nexus, // constant
            address _rewardToken, // constant
            address _distributor,
            IERC20 _underlying, // constant
            string memory _nameArg, // constant
            string memory _symbolArg, // constant
            uint8 _decimalsArg // constant
        )
        public
        SavingsCredit(_nexus, _rewardToken, _distributor, _nameArg, _symbolArg, _decimalsArg)
    {
        require(address(_underlying) != address(0), "mAsset address is zero");
        underlying = _underlying;
    }

    /** @dev Only the savings managaer (pulled from Nexus) can execute this */
    modifier onlySavingsManager() {
        require(msg.sender == _savingsManager(), "Only savings manager can execute");
        _;
    }


    /** @dev Enable or disable the automation of fee collection during deposit process */
    function automateInterestCollectionFlag(bool _enabled)
        external
        onlyGovernor
    {
        automateInterestCollection = _enabled;
        emit AutomaticInterestCollectionSwitched(_enabled);
    }

    /***************************************
                    INTEREST
    ****************************************/

    /**
     * @dev Deposit interest (add to savings) and update exchange rate of contract.
     *      Exchange rate is calculated as the ratio between new savings q and credits:
     *                    exchange rate = savings / credits
     *
     * @param _amount   Units of underlying to add to the savings vault
     */
    function depositInterest(uint256 _amount)
        external
        onlySavingsManager // TODO - remove this?
    {
        require(_amount > 0, "Must deposit something");

        // Transfer the interest from sender to here
        require(underlying.transferFrom(msg.sender, address(this), _amount), "Must receive tokens");

        // Calc new exchange rate, protect against initialisation case
        uint256 totalCredits = _totalCredits;
        if(totalCredits > 0) {
            // new exchange rate is relationship between _totalCredits & totalSavings
            // _totalCredits * exchangeRate = totalSavings
            // exchangeRate = totalSavings/_totalCredits
            uint256 amountPerCredit = _amount.divPrecisely(totalCredits);
            uint256 newExchangeRate = exchangeRate.add(amountPerCredit);
            exchangeRate = newExchangeRate;

            emit ExchangeRateUpdated(newExchangeRate, _amount);
        }
    }

    modifier onlyPoker() {
        // require(msg.sender == poker);
        _;
    }

    // Protects against initiailisation case
    function pokeSurplus()
        external
        onlyPoker
    {
        uint256 sum = _creditToUnderlying(_totalCredits);
        uint256 balance = underlying.balanceOf(address(this));
        if(balance > sum){
            exchangeRate = balance.divPrecisely(_totalCredits);
        }
    }


    /***************************************
                    SAVING
    ****************************************/

    /**
     * @dev Deposit the senders savings to the vault, and credit them internally with "credits".
     *      Credit amount is calculated as a ratio of deposit amount and exchange rate:
     *                    credits = underlying / exchangeRate
     *      If automation is enabled, we will first update the internal exchange rate by
     *      collecting any interest generated on the underlying.
     * @param _underlying      Units of underlying to deposit into savings vault
     * @return creditsIssued   Units of credits issued internally
     */
    function depositSavings(uint256 _underlying)
        external
        returns (uint256 creditsIssued)
    {
        return _deposit(_underlying, msg.sender);
    }

    function deposit(uint256 _underlying, address _beneficiary)
        external
        returns (uint256 creditsIssued)
    {
        return _deposit(_underlying, _beneficiary);
    }

    function _deposit(uint256 _underlying, address _beneficiary)
        internal
        returns (uint256 creditsIssued)
    {
        require(_underlying > 0, "Must deposit something");

        // Collect recent interest generated by basket and update exchange rate
        IERC20 mAsset = underlying;
        ISavingsManager(_savingsManager()).collectAndDistributeInterest(address(mAsset));

        // Transfer tokens from sender to here
        require(mAsset.transferFrom(msg.sender, address(this), _underlying), "Must receive tokens");

        // Calc how many credits they receive based on currentRatio
        creditsIssued = _underlyingToCredits(_underlying);

        // add credits to balances
        _mint(_beneficiary, creditsIssued);

        emit SavingsDeposited(_beneficiary, _underlying, creditsIssued);
    }

    /**
     * @dev Redeem specific number of the senders "credits" in exchange for underlying.
     *      Payout amount is calculated as a ratio of credits and exchange rate:
     *                    payout = credits * exchangeRate
     * @param _credits         Amount of credits to redeem
     * @return massetReturned  Units of underlying mAsset paid out
     */
    function redeem(uint256 _credits)
        external
        returns (uint256 massetReturned)
    {
        require(_credits > 0, "Must withdraw something");

        massetReturned = _redeem(_credits);

        // Collect recent interest generated by basket and update exchange rate
        if(automateInterestCollection) {
            ISavingsManager(_savingsManager()).collectAndDistributeInterest(address(underlying));
        }
    }


    function redeemUnderlying(uint256 _underlying)
        external
        returns (uint256 creditsBurned)
    {
        require(_underlying > 0, "Must withdraw something");

        if(automateInterestCollection) {
            // Collect recent interest generated by basket and update exchange rate
            ISavingsManager(_savingsManager()).collectAndDistributeInterest(address(underlying));
        }

        uint256 requiredCredits = _underlyingToCredits(_underlying);

        uint256 returned = _redeem(requiredCredits);
        require(returned == _underlying, "Did not redeem sufficiently");

        return requiredCredits;
    }

    function _redeem(uint256 _credits)
        internal
        returns (uint256 massetReturned)
    {
        // uint256 saverCredits = _creditBalances[msg.sender];
        // require(saverCredits >= _credits, "Saver has no credits");

        _burn(msg.sender, _credits);

        // Calc payout based on currentRatio
        massetReturned = _creditToUnderlying(_credits);

        // Transfer tokens from here to sender
        require(underlying.transfer(msg.sender, massetReturned), "Must send tokens");

        emit CreditsRedeemed(msg.sender, _credits, massetReturned);
    }
    

    /***************************************
                    VIEWING
    ****************************************/

    function balanceOfUnderlying(address _user) external view returns (uint256 balance) {
        return _creditToUnderlying(_creditBalances[_user]);
    }


    function creditBalances(address _user) external view returns (uint256) {
        return _creditBalances[_user];
    }

    /**
     * @dev Converts masset amount into credits based on exchange rate
     *               c = masset / exchangeRate
     */
    function _underlyingToCredits(uint256 _underlying)
        internal
        view
        returns (uint256 credits)
    {
        // e.g. (1e20 * 1e18) / 1e18 = 1e20
        // e.g. (1e20 * 1e18) / 14e17 = 7.1429e19
        // e.g. 1 * 1e18 / 1e17 + 1 = 11 => 11 * 1e17 / 1e18 = 1.1e18 / 1e18 = 1
        credits = _underlying.divPrecisely(exchangeRate).add(1);
    }

    /**
     * @dev Converts masset amount into credits based on exchange rate
     *               m = credits * exchangeRate
     */
    function _creditToUnderlying(uint256 _credits)
        internal
        view
        returns (uint256 underlyingAmount)
    {
        // e.g. (1e20 * 1e18) / 1e18 = 1e20
        // e.g. (1e20 * 14e17) / 1e18 = 1.4e20
        underlyingAmount = _credits.mulTruncate(exchangeRate);
    }
}
