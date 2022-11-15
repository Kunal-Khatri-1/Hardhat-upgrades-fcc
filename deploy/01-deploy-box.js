const { developmentChains } = require("../helper-hardhat-config")

const { network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const waitBlockConfirmations = developmentChains.includes(network.name) || 1

    log("----------------------------------------------------")

    // hardhat will rename Box => Box_Implementation and BoxProxyAdmin => Box_Proxy when it is being deployed

    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: waitBlockConfirmations,
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    })

    // Be sure to check out the hardhat-deploy examples to use UUPS proxies!
    // https://github.com/wighawag/template-ethereum-contracts

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        const boxAddress = (await ethers.getContract("Box_Implementation")).address
        console.log(`Box_Implementation: ${boxAddress}      ${box.address}`)
        await verify(boxAddress, [])
    }
    log("----------------------------------------------------")
}

module.exports.tags = ["all", "box"]
