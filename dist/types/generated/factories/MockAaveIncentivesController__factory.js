"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockAaveIncentivesController__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_rewardsToken",
                type: "address",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "",
                type: "address[]",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "claimRewards",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address[]",
                name: "assets",
                type: "address[]",
            },
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "getRewardsBalance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "user",
                type: "address",
            },
        ],
        name: "getUserUnclaimedRewards",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "rewardsToken",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
const _bytecode = "0x60a060405234801561001057600080fd5b506040516103d13803806103d183398101604081905261002f91610044565b60601b6001600160601b031916608052610072565b600060208284031215610055578081fd5b81516001600160a01b038116811461006b578182fd5b9392505050565b60805160601c61033b6100966000396000818160ae015261011f015261033b6000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063198fa81e146100515780633111e7b3146100775780638b599f261461008a578063d1af0c7d146100a9575b600080fd5b61006461005f366004610217565b6100e8565b6040519081526020015b60405180910390f35b61006461008536600461028a565b6100f8565b610064610098366004610238565b68056bc75e2d631000009392505050565b6100d07f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161006e565b68056bc75e2d631000005b919050565b60405163a9059cbb60e01b815233600482015268056bc75e2d6310000060248201526000907f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03169063a9059cbb90604401602060405180830381600087803b15801561016b57600080fd5b505af115801561017f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101a391906102e5565b5068056bc75e2d6310000095945050505050565b80356001600160a01b03811681146100f357600080fd5b60008083601f8401126101df578182fd5b50813567ffffffffffffffff8111156101f6578182fd5b602083019150836020808302850101111561021057600080fd5b9250929050565b600060208284031215610228578081fd5b610231826101b7565b9392505050565b60008060006040848603121561024c578182fd5b833567ffffffffffffffff811115610262578283fd5b61026e868287016101ce565b90945092506102819050602085016101b7565b90509250925092565b6000806000806060858703121561029f578081fd5b843567ffffffffffffffff8111156102b5578182fd5b6102c1878288016101ce565b909550935050602085013591506102da604086016101b7565b905092959194509250565b6000602082840312156102f6578081fd5b81518015158114610231578182fdfea264697066735822122002b3246781a084157d672d14c20676d2905a55d44781465ca2badb412c1e007064736f6c63430008020033";
class MockAaveIncentivesController__factory extends ethers_1.ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(_rewardsToken, overrides) {
        return super.deploy(_rewardsToken, overrides || {});
    }
    getDeployTransaction(_rewardsToken, overrides) {
        return super.getDeployTransaction(_rewardsToken, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.MockAaveIncentivesController__factory = MockAaveIncentivesController__factory;
MockAaveIncentivesController__factory.bytecode = _bytecode;
MockAaveIncentivesController__factory.abi = _abi;
//# sourceMappingURL=MockAaveIncentivesController__factory.js.map