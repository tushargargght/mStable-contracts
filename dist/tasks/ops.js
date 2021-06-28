"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config_1 = require("hardhat/config");
const generated_1 = require("types/generated");
const tokens_1 = require("./utils/tokens");
const defender_utils_1 = require("./utils/defender-utils");
const deploy_utils_1 = require("./utils/deploy-utils");
const getSavingsManager = (signer, contractAddress = "0x9781c4e9b9cc6ac18405891df20ad3566fb6b301") => generated_1.ISavingsManager__factory.connect(contractAddress, signer);
config_1.task("eject-stakers", "Ejects expired stakers from Meta staking contract (vMTA)")
    .addOptionalParam("speed", "Defender Relayer speed param: 'safeLow' | 'average' | 'fast' | 'fastest'", "average", config_1.types.string)
    .setAction(async (taskArgs, { ethers, network }) => {
    const signer = await defender_utils_1.getSigner(network.name, ethers, taskArgs.speed);
    const ejector = generated_1.IEjector__factory.connect("0x71061E3F432FC5BeE3A6763Cd35F50D3C77A0434", signer);
    // TODO check the last time the eject was run
    // Check it's been more than 7 days since the last eject has been run
    // get stakers from API
    const response = await axios_1.default.get("https://api-dot-mstable.appspot.com/stakers");
    const stakers = response.data.ejected;
    if (stakers.length === 0) {
        console.error(`No stakers to eject`);
        process.exit(0);
    }
    console.log(`${stakers.length} stakers to be ejected: ${stakers}`);
    const tx = await ejector.ejectMany(stakers);
    await deploy_utils_1.logTxDetails(tx, "ejectMany");
});
config_1.task("collect-interest", "Collects and streams interest from platforms")
    .addParam("asset", "Token symbol of main or feeder pool asset. eg mUSD, mBTC, fpmBTC/HBTC or fpmUSD/GUSD", undefined, config_1.types.string, false)
    .addOptionalParam("speed", "Defender Relayer speed param: 'safeLow' | 'average' | 'fast' | 'fastest'", "average", config_1.types.string)
    .setAction(async (taskArgs, { ethers, network }) => {
    const asset = tokens_1.tokens.find((t) => t.symbol === taskArgs.asset);
    if (!asset) {
        console.error(`Failed to find main or feeder pool asset with token symbol ${taskArgs.asset}`);
        process.exit(1);
    }
    const signer = await defender_utils_1.getSigner(network.name, ethers, taskArgs.speed);
    const savingManager = getSavingsManager(signer);
    const lastBatchCollected = await savingManager.lastBatchCollected(asset.address);
    const lastBatchDate = new Date(lastBatchCollected.mul(1000).toNumber());
    console.log(`The last interest collection was ${lastBatchDate.toUTCString()}, epoch ${lastBatchCollected} seconds`);
    const currentEpoc = new Date().getTime() / 1000;
    if (currentEpoc - lastBatchCollected.toNumber() < 60 * 60 * 6) {
        console.error(`Can not run again as the last run was less then 6 hours ago`);
        process.exit(3);
    }
    const tx = await savingManager.collectAndStreamInterest(asset.address);
    await deploy_utils_1.logTxDetails(tx, "collectAndStreamInterest");
});
config_1.task("polly-daily", "Runs the daily jobs against the contracts on Polygon mainnet")
    .addOptionalParam("speed", "Defender Relayer speed param: 'safeLow' | 'average' | 'fast' | 'fastest'", "fast", config_1.types.string)
    .setAction(async (taskArgs, { ethers, network }) => {
    const signer = await defender_utils_1.getSigner(network.name, ethers, taskArgs.speed);
    const aave = new generated_1.PAaveIntegration__factory(signer).attach("0xeab7831c96876433dB9B8953B4e7e8f66c3125c3");
    const aaveTx = await aave.claimRewards({ gasLimit: 200000 });
    await deploy_utils_1.logTxDetails(aaveTx, "claimRewards");
    const liquidator = new generated_1.PLiquidator__factory(signer).attach("0x9F1C06CC13EDc7691a2Cf02E31FaAA64d57867e2");
    const liquidatorTx = await liquidator.triggerLiquidation("0xeab7831c96876433dB9B8953B4e7e8f66c3125c3", { gasLimit: 2000000 });
    await deploy_utils_1.logTxDetails(liquidatorTx, "triggerLiquidation");
    const savingsManager = new generated_1.SavingsManager__factory(signer).attach("0x10bFcCae079f31c451033798a4Fd9D2c33Ea5487");
    const savingsManagerTx = await savingsManager.collectAndStreamInterest("0xE840B73E5287865EEc17d250bFb1536704B43B21", {
        gasLimit: 2000000,
    });
    await deploy_utils_1.logTxDetails(savingsManagerTx, "collectAndStreamInterest");
});
module.exports = {};
//# sourceMappingURL=ops.js.map