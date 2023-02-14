const { getNamedAccounts } = require("hardhat");
const {
  networkConfig,
  DAIETHContractAddress,
} = require("../helper-hardhat.config");
const { getWeth, Amount } = require("../scripts/getWeth");

async function main() {
  const { deployer } = await getNamedAccounts();
  await getWeth();

  //interact with the aave protocol ABI and address
  //address of 0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5
  const lendingpool = await GetLendingpooladdress(deployer);
  console.log(lendingpool.address);

  const wethTokenContractAddress =
    networkConfig[network.config.chainId].wethToken;

  //deposit
  await approveERC20(
    wethTokenContractAddress,
    lendingpool.address,
    Amount,
    deployer
  );
  console.log("Depositing...");
  await lendingpool.deposit(wethTokenContractAddress, Amount, deployer, 0);
  console.log("deposited....");

  //Borrow
  //Available borrow eth //conversion rate on DAI token
  let { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await getUserBorrowData(lendingpool, deployer);
  const DAIPrice = await GetDAIprice();
  const DAIBorrowETH =
    (await availableBorrowsETH.toString()) * 0.95 * (1 / DAIPrice.toNumber());
}
async function GetDAIprice() {
  const DAIETHPricefeed = await ethers.getContractAt(
    "AggregatorV3Interface",
    DAIETHContractAddress
  );
  const [, answer, , ,] = await DAIETHPricefeed.latestRoundData();
  console.log("the DAI ETH price is " + answer);
  return answer;
}
async function getUserBorrowData(lendingpool, account) {
  //how much we have borrowed || how much we have in collateral || how much we can borrow
  const { totalCollateralETH, totalDebtETH, availableBorrowsETH } =
    await lendingpool.getUserAccountData(account);
  console.log("The total collateral Eth is " + totalCollateralETH);
  console.log("The total Debth Eth is " + totalDebtETH);
  console.log("The total Available  Eth is " + availableBorrowsETH);
  return { totalCollateralETH, totalDebtETH, availableBorrowsETH };
}
async function GetLendingpooladdress(account) {
  const IlendingpoolAddressProvider = await ethers.getContractAt(
    "ILendingPoolAddressesProvider",
    "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
    account
  );
  const LendingPoolAddress = await IlendingpoolAddressProvider.getLendingPool();
  const ilendingPool = await ethers.getContractAt(
    "ILendingPool",
    LendingPoolAddress,
    account
  );
  return ilendingPool;
}
async function approveERC20(
  erc20address,
  spenderaddress,
  AmountToSpend,
  account
) {
  const erc20 = await ethers.getContractAt("IERC20", erc20address, account);
  console.log("passed 1");
  const approve = await erc20.approve(spenderaddress, AmountToSpend);
  //console.log(approve);
  console.log("Passed 2");
  await approve.wait(1);
  console.log("Approved to address " + spenderaddress);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
