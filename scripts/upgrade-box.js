// manual way
const { ethers } = require("hardhat")

async function main() {
    const boxProxyAdmin = await ethers.getContract("BoxProxyAdmin")
    const trasnparentProxy = await ethers.getContract("Box_Proxy")
    const boxV2 = await ethers.getContract("BoxV2")

    // Before upgrade
    const proxyBoxV1 = await ethers.getContractAt("Box", trasnparentProxy.address)
    const versionV1 = await proxyBoxV1.version()
    console.log(`VersionV1: ${versionV1}`)

    // calling boxProxyAdmin which calls it on transparentProxy which will change the implementation form Box1 to Box2
    const upgradeTx = await boxProxyAdmin.upgrade(trasnparentProxy.address, boxV2.address)
    await upgradeTx.wait(1)

    // to work with the functions in BoxV2
    // getting the BoxV2 ABI and loading at transparentProxy address
    // this way ethers knows that we will be calling all functions on the transparentProxy address but the proxyBox will have the ABI of BoxV2
    const proxyBoxV2 = await ethers.getContractAt("BoxV2", trasnparentProxy.address)
    const versionV2 = await proxyBoxV2.version()
    console.log(`VersionV2: ${versionV2}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
