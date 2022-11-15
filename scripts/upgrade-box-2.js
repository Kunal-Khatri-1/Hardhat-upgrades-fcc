const { ethers, upgrades } = require("hardhat")

async function main() {
    // getting the the proxyContract address without deploying using upgrade.depoloyProxy will not add/create proxy contract to network file of openzeppelin in .openzeppelin folder at root level
    // this will result in error

    const boxV2 = await ethers.getContractFactory("BoxV2")
    // 0x71A85031E7591656b1636FDd67D526a0B65a810D => TransparentUpgradable Proxy address on goerli
    // 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707 => TransparentUpgradable Proxy address on localhost
    let box = await upgrades.upgradeProxy("0x5FC8d32690cc91D4c39d9d3abcBD16989F875707", boxV2)
    console.log("Your upgraded proxy is done!: ", box.address)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
