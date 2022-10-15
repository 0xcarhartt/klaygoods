// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract KlayGoods is ERC20 {
    constructor() ERC20("KlayGoods", "KLGD") {
        _mint(msg.sender, 100000000 * 10**18);
    }
}
