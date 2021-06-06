<br />
<p align="center">
  <h3 align="center">Ethhole Cheese Token</h3>

  <p align="center">
    A non-fungible token dapp for a token that no one wants to have, a cheese touch token. Allow only 1 token to be 'live' at a time. If there is no live token anyone can create one. Allow users to transfer the live token to anyone else. If any user holds a live token for more than 24 hours then they can no longer transfer it, and the token should no longer be live.
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

### Built With

- [Solidity](https://soliditylang.org/)
- [Hardhat](https://hardhat.org/)
- [TypeScript](https://typescriptlang.org/)
- [OpenZeppelin(ERC721)](https://docs.openzeppelin.com/contracts/4.x/erc721)

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/0xdavinchee/ethhole-voting-dapp.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
   <!-- USAGE EXAMPLES -->

## Usage

To compile: `npx hardhat compile`.

To run tests: `npx hardhat test`.

Run `npx hardhat node` to start up a local node.

Open up another terminal window and run `npx hardhat deploy --network localhost` to deploy your project to localhost. You can similarly deploy to other networks like so: `npx hardhat deploy --network <NETWORK>`

Connect to the hardhat console at localhost with `npx hardhat console --network localhost` and create an instance of the contract and attach it to the address it was deployed to:

```
const contract = await (await ethers.getContractFactory("<CONTRACT_NAME>")).attach("<ADDRESS>");
```

This will give you access to the functions of the contract. You can get multiple accounts to interact with the contract using

```
const accounts = await hre.getUnnamedAccounts()
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

<!-- CONTACT -->

## Contact

[@0xdavinchee](https://twitter.com/@0xdavinchee) - 0xdavinchee@gmail.com

Project Link: [https://github.com/0xdavinchee/ethhole-voting-dapp](https://github.com/0xdavinchee/ethhole-voting-dapp)

# ethhole-cheese-token
