const { inputToConfig } = require("@ethereum-waffle/compiler")
const { expect } = require("chai")

let Box, box

describe("Box (proxy)", function () {
    beforeEach(async function () {
        Box = await ethers.getContractFactory("Box")
        // store will act like a cosntructor in the Box contract.
        // store itself is a normal function but { initializer: "store" } will make it act like a constructor
        box = await upgrades.deployProxy(Box, [42], { initializer: "store" })
    })

    it("retrieve returns a value previously initialized", async function () {
        // callling the retrieve function in proxy contract which will be delegatecalled to the Box/logic/Implementation contract
        expect((await box.retrieve()).toString()).to.equal("42")
    })
})
