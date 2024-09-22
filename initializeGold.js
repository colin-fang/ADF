const UTC = artifacts.require('UTCImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');

// Sepolia testnet GoldPriceOracle address
const goldPriceOracleAddress = "0xE7c03730db9c632acDa8d854971Bf81263663cEc";

module.exports = async function(deployer) {
  // Step 1: Get the Proxy contract
  const proxy = await Proxy.deployed();
  console.log(`Current Proxy address: ${proxy.address}`);
  const admin = await proxy.admin();
  console.log(`Admin address: ${admin}`);
  // Get accounts
  const accounts = await web3.eth.getAccounts();
  
  // Log the account running the script
  const activeAccount = accounts[0];  // Usually the first account is the one running the script
  console.log(`Running the script with account: ${activeAccount}`);

  // Step 2: Create an instance of the proxied UTCImplementation contract
  const proxiedUTC = await UTC.at(proxy.address);

  
    console.log("Initializing the UTC contract with GoldPriceOracle...");
    try{
    await proxiedUTC.initialize(goldPriceOracleAddress);
    console.log(`UTCImplementation initialized with GoldPriceOracle address: ${goldPriceOracleAddress}`);
    }catch (error) {
    console.error('Error during deployment:', error.message);
    console.error('Detailed error:', error);
  }
  
};
