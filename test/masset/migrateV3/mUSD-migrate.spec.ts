/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { expect } from "chai"
import { Signer } from "ethers"
import { ethers, network } from "hardhat"

import { ONE_WEEK, ONE_DAY, ZERO_ADDRESS } from "@utils/constants"
import { simpleToExactAmount } from "@utils/math"
import {
    DelayedProxyAdmin,
    DelayedProxyAdmin__factory,
    ERC20__factory,
    Masset,
    MassetV2,
    MassetV2__factory,
    Masset__factory,
    MusdV3__factory,
} from "types/generated"
import { increaseTime } from "@utils/time"

// Accounts that are impersonated
const deployerAddress = "0x19F12C947D25Ff8a3b748829D8001cA09a28D46d"
const governorMultisigSigner = "0x4186C5AEd424876f7EBe52f9148552A45E17f287"
const ethWhaleAddress = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"

// Mainnet contract addresses
const mUsdProxyAddress = "0xe2f2a5C287993345a840Db3B0845fbC70f5935a5"
const mUsdV2ImplAddress = "0xE0d0D052d5B1082E52C6b8422Acd23415c3DF1c4"
const basketManagerAddress = "0x66126B4aA2a1C07536Ef8E5e8bD4EfDA1FdEA96D"
const nexusAddress = "0xafce80b19a8ce13dec0739a1aab7a028d6845eb3"
const delayedProxyAdminAddress = "0x5C8eb57b44C1c6391fC7a8A0cf44d26896f92386"
const governorMultisigAddress = "0x4186c5aed424876f7ebe52f9148552a45e17f287"
const oldForgeValidator = "0xbB90D06371030fFa150E463621c22950b212eaa1"
const invariantValidatorAddress = "0xd36050B5F28126b5292B59128ED25E489a0f2F3f"
const linkedAddress = {
    __$1a38b0db2bd175b310a9a3f8697d44eb75$__: "0x1E91F826fa8aA4fa4D3F595898AF3A64dd188848",
}

const defaultConfig = {
    a: 120,
    limits: {
        min: simpleToExactAmount(5, 16),
        max: simpleToExactAmount(75, 16),
    },
}

const impersonate = async (addr): Promise<Signer> => {
    await network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [addr],
    })
    return ethers.provider.getSigner(addr)
}

describe("mUSD V2.0 to V3.0", () => {
    let mUsdV3Factory: MusdV3__factory
    let mUsdV2: MassetV2
    // let mUsdProxy: AssetProxy
    let mUsd: Masset
    let delayedProxyAdmin: DelayedProxyAdmin
    let deployer: Signer
    let governorMultisig: Signer
    before(async () => {
        // Impersonate mainnet accounts
        deployer = await ethers.provider.getSigner(deployerAddress)
        governorMultisig = await ethers.provider.getSigner(governorMultisigAddress)
        const ethWhale = await ethers.provider.getSigner(ethWhaleAddress)

        await ethWhale.sendTransaction({
            to: governorMultisigAddress,
            value: simpleToExactAmount(10),
        })

        mUsdV3Factory = new MusdV3__factory(linkedAddress, deployer)
        const size = mUsdV3Factory.bytecode.length / 2 / 1000
        if (size > 24.576) {
            console.error(`Masset size is ${size} kb: ${size - 24.576} kb too big`)
        } else {
            console.log(`Masset = ${size} kb`)
        }

        mUsdV2 = new MassetV2__factory(deployer).attach(mUsdProxyAddress)
        // mUsdProxy = new AssetProxy__factory(deployer).attach(mUsdProxyAddress)
        mUsd = new Masset__factory(linkedAddress, deployer).attach(mUsdProxyAddress)
        console.log(`Finished before setup at ${new Date()}`)
        delayedProxyAdmin = new DelayedProxyAdmin__factory(governorMultisig).attach(delayedProxyAdminAddress)
    })

    it("Connected to forked mUSD V2", async () => {
        expect(await mUsdV2.swapFee()).to.eq(simpleToExactAmount(6, 14))
        expect(await mUsdV2.redemptionFee()).to.eq(simpleToExactAmount(3, 14))
    })
    it("Impersonated governor multisig wallet deploy test ERC20 token", async () => {
        const tokenFactory = await new ERC20__factory(governorMultisig)
        const token = await tokenFactory.deploy("test name", "test symbol")
        expect(await token.symbol()).to.eq("test symbol")
    })
    it("Validate delayedProxyAdmin", async () => {
        expect(await delayedProxyAdmin.UPGRADE_DELAY(), "upgrade delay").to.eq(ONE_WEEK)
        expect(await delayedProxyAdmin.getProxyImplementation(mUsdProxyAddress), "delayed proxy admin").to.eq(
            "0xE0d0D052d5B1082E52C6b8422Acd23415c3DF1c4",
        )
        expect(await delayedProxyAdmin.getProxyAdmin(mUsdProxyAddress), "delayed proxy admin").to.eq(delayedProxyAdminAddress)
    })
    it("Before upgrade checks", async () => {
        // The mUSD proxy is still pointing to the old validator
        expect(await mUsdV2.forgeValidator(), "forge validator").to.eq(oldForgeValidator)
        expect(await mUsdV2.getBasketManager(), "basket manager").to.eq(basketManagerAddress)
        expect(await mUsdV2.symbol(), "symbol").to.eq("mUSD")
    })
    context.only("Upgrade of mUSD implementation using upgradeTo from delayed admin proxy", () => {
        beforeEach(async () => {
            const mUsdV3 = await mUsdV3Factory.deploy(nexusAddress)
            // The mUSD implementation will have a blank validator
            expect(await mUsdV3.forgeValidator(), "before old validator").to.eq(ZERO_ADDRESS)

            // Propose upgrade to the mUSD proxy contract using the delayed proxy admin contract
            const proposeUpgradeTx = delayedProxyAdmin.proposeUpgrade(mUsdProxyAddress, mUsdV3.address, "0x")
            await expect(proposeUpgradeTx).to.emit(delayedProxyAdmin, "UpgradeProposed")

            // Move the chain forward by just over 1 week
            await increaseTime(ONE_WEEK.toNumber() + 100)

            // Approve and execute call to upgradeToAndCall on mUSD proxy which then calls migrate on the new mUSD V3 implementation
            await delayedProxyAdmin.acceptUpgradeRequest(mUsdProxyAddress)
        })
        it("Should upgrade", async () => {
            const mUsdV3Proxy = await mUsdV3Factory.attach(mUsdProxyAddress)
            await mUsdV3Proxy.upgrade(invariantValidatorAddress, defaultConfig)

            expect(await mUsdV2.forgeValidator(), "forge validator").to.eq(invariantValidatorAddress)
            expect(await mUsdV2.symbol(), "symbol").to.eq("mUSD")

            const invariantConfig = await mUsdV3Proxy.getConfig()
            expect(invariantConfig.a, "amplification coefficient (A)").to.eq(defaultConfig.a * 100)
        })
        it("Should fail to call upgrade again", async () => {
            const mUsdV3Proxy = await mUsdV3Factory.attach(mUsdProxyAddress)
            await expect(mUsdV3Proxy.upgrade(invariantValidatorAddress, defaultConfig)).to.revertedWith("already upgraded")
        })
        // TODO add mint, swap and redeem
    })
    context("Upgrade of mUSD implementation using upgradeToAndCall from delayed admin proxy", () => {
        it("migrate via time deploy admin contract", async () => {
            const mUsdV3 = await mUsdV3Factory.deploy(nexusAddress)
            // The mUSD implementation will have a blank validator
            expect(await mUsdV3.forgeValidator(), "before old validator").to.eq(ZERO_ADDRESS)

            // construct the tx data to call migrate on the newly deployed mUSD V3 implementation
            const migrateCallData = mUsdV3.interface.encodeFunctionData("upgrade", [invariantValidatorAddress, defaultConfig])
            // Propose upgrade to the mUSD proxy contract using the delayed proxy admin contract
            const proposeUpgradeTx = delayedProxyAdmin.proposeUpgrade(mUsdProxyAddress, mUsdV3.address, migrateCallData)
            await expect(proposeUpgradeTx).to.emit(delayedProxyAdmin, "UpgradeProposed")

            // Move the chain forward by just over 1 week
            await increaseTime(ONE_WEEK.toNumber() + 100)
            // await delayedProxyAdmin.cancelUpgrade(mUsdProxyAddress)

            // Approve and execute call to upgradeToAndCall on mUSD proxy which then calls migrate on the new mUSD V3 implementation
            const tx = delayedProxyAdmin.acceptUpgradeRequest(mUsdProxyAddress)
            await expect(tx)
                .to.emit(delayedProxyAdmin, "Upgraded")
                .withArgs(mUsdProxyAddress, mUsdV2ImplAddress, mUsdV3.address, migrateCallData)

            // The new mUSD implementation will still have a blank validator
            // as the mUSD storage is in the proxy
            expect(await mUsdV3.forgeValidator(), "after old validator").to.eq(ZERO_ADDRESS)
        })
        it("After upgrade checks", async () => {
            // The mUSD proxy is now pointing to the invariant validator
            expect(await mUsd.forgeValidator(), "new validator").to.eq(invariantValidatorAddress)
            // expect(await mUsd.getBasketManager(), "basket manager").to.eq(basketManagerAddress)
            expect(await mUsd.symbol(), "symbol").to.eq("mUSD")
        })
    })
})