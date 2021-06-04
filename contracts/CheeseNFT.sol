//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CheeseNFT is ERC721 {
    using Counters for Counters.Counter;

    // there will never be a token with the id 0.
    Counters.Counter private _tokenIds;
    uint256 private lastMintedAt;

    constructor() ERC721("Cheese", "CHS") {}

    function createCheeseNFT() external {
        require(
            block.timestamp - lastMintedAt > 24 hours,
            "You cannot create cheese when one is living."
        );
        _tokenIds.increment();
        uint256 currentId = _tokenIds.current();
        _mint(msg.sender, currentId);
        lastMintedAt = block.timestamp;
    }

    function _transfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override {
        require(
            block.timestamp - lastMintedAt < 24 hours,
            "You cannot transfer your dead cheese."
        );
        super._transfer(_from, _to, _tokenId);
    }

    function getCurrentTokenId() external view returns (uint256) {
        return _tokenIds.current();
    }

    function getLastMintedAt() external view returns (uint256) {
        return lastMintedAt;
    }
}
