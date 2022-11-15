const { ethers, upgrades } = require("hardhat")

async function main() {
    const Box = await ethers.getContractFactory("Box")
    // only gonna deploy all 3 the 1st time we do deployProxy
    // consequent times calling deployProxy will only deploy the implementation
    console.log("Deploying proxy, box implementation, and proxy admin...")

    // this gives the address of transparentUpgradableProxy which act like proxy for Box implementation s
    const boxProxy = await upgrades.deployProxy(Box, [42], { initializer: "store" })
    console.log("BoxProxy deployed to: ", boxProxy.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
