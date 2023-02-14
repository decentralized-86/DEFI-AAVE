const { getNamedAccounts, network } = require("hardhat");
const { networkConfig } = require("../helper-hardhat.config");
const Amount = ethers.utils.parseEther("0.02");
async function getWeth() {
  const { deployer } = await getNamedAccounts();

  //call the deposit function
  //need ABI and  the contract address
  const iweth = await ethers.getContractAt(
    "IWeth",
    networkConfig[network.config.chainId].wethToken,
    deployer
  );
  const tx = await iweth.deposit({ value: Amount });
  tx.wait(1);
  console.log("Deposit fucntion " + tx.toString());
  const tx1 = await iweth.balanceOf(deployer);
  console.log("The balance Weth is " + tx1.toString());
}
module.exports = { getWeth, Amount };
