const { version } = require("chai");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL;
// console.log(GOERLI_RPC_URL);
// console.log(PRIVATE_KEY);
// console.log(ETHERSCAN_API_KEY);
// console.log(MAINNET_RPC_URL);

module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.9" },
      { version: "0.4.19" },
      { version: "0.6.12" },
      { version: "0.6.0" },
    ],
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 31337,
      forking: {
        url: MAINNET_RPC_URL,
      },
    },
    goerli: {
      url: GOERLI_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 5,
      blockConfirmations: 5,
    },
  },
  etherscan: {
    apiKey: {
      goerli: ETHERSCAN_API_KEY,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    player: {
      default: 1,
    },
  },
  mocha: {
    timeout: 500000,
  },
};
