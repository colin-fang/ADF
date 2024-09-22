const UTC = artifacts.require('UTCImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');
// mainnet
// const goldPriceOracleAddress = "0xF3c5d44133E1aa1A247f0e7F0D31e4bcDedb4F12"; 
// testnet sepolia
const goldPriceOracleAddress = "0xE7c03730db9c632acDa8d854971Bf81263663cEc"; 

module.exports = async function(deployer) {
  try {
    // Step 1: Deploy the new UTCImplementation contract
    await deployer.deploy(UTC, goldPriceOracleAddress);
    const utcInstance = await UTC.deployed(); // Get the deployed instance
    console.log(`UTCImplementation deployed at: ${utcInstance.address}`);
  
    // Step 2: Get the deployed Proxy contract
    const proxy = await Proxy.deployed();
    console.log(`Current Proxy address: ${proxy.address}`);
  
    // Check if the current admin is correct
    const adminAddress = await proxy.admin();
    console.log(`Current admin address: ${adminAddress}`);
  
    // Step 3: Upgrade the proxy to point to the new UTCImplementation contract
    await proxy.upgradeTo(utcInstance.address);
    console.log(`Proxy upgraded to new implementation at ${utcInstance.address}`);
  } catch (error) {
    console.error('Error during deployment: ', error);
  }
};
