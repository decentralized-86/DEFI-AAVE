const networkConfig = {
  31337: {
    name: "hardhat",
    wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  },
  5: {
    name: "goerli",
    wethToken: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
  },
};
const DAIETHContractAddress = "0x773616E4d11A78F511299002da57A0a94577F1f4";
const developmentchains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentchains,
  DAIETHContractAddress,
};
