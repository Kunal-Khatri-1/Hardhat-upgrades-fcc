// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract BoxProxyAdmin is ProxyAdmin {
    // to have the BoxProxyAdmin work with hardhat-deploy we have to do =>

    constructor(
        address /* owner */
    ) ProxyAdmin() {
        // We just need this for our hardhat tooling right now
    }
}
