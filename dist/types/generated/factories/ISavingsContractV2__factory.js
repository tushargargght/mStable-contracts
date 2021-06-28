"use strict";
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISavingsContractV2__factory = void 0;
const ethers_1 = require("ethers");
const _abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_user",
                type: "address",
            },
        ],
        name: "balanceOfUnderlying",
        outputs: [
            {
                internalType: "uint256",
                name: "underlying",
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
                name: "",
                type: "address",
            },
        ],
        name: "creditBalances",
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
                internalType: "uint256",
                name: "_credits",
                type: "uint256",
            },
        ],
        name: "creditsToUnderlying",
        outputs: [
            {
                internalType: "uint256",
                name: "underlying",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "depositInterest",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
            {
                internalType: "address",
                name: "_beneficiary",
                type: "address",
            },
        ],
        name: "depositSavings",
        outputs: [
            {
                internalType: "uint256",
                name: "creditsIssued",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "depositSavings",
        outputs: [
            {
                internalType: "uint256",
                name: "creditsIssued",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "exchangeRate",
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
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "redeem",
        outputs: [
            {
                internalType: "uint256",
                name: "massetReturned",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "redeemCredits",
        outputs: [
            {
                internalType: "uint256",
                name: "underlyingReturned",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amount",
                type: "uint256",
            },
        ],
        name: "redeemUnderlying",
        outputs: [
            {
                internalType: "uint256",
                name: "creditsBurned",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "underlying",
        outputs: [
            {
                internalType: "contract IERC20",
                name: "underlyingMasset",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_underlying",
                type: "uint256",
            },
        ],
        name: "underlyingToCredits",
        outputs: [
            {
                internalType: "uint256",
                name: "credits",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
];
class ISavingsContractV2__factory {
    static createInterface() {
        return new ethers_1.utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new ethers_1.Contract(address, _abi, signerOrProvider);
    }
}
exports.ISavingsContractV2__factory = ISavingsContractV2__factory;
ISavingsContractV2__factory.abi = _abi;
//# sourceMappingURL=ISavingsContractV2__factory.js.map