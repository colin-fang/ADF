const UTC = artifacts.require('UTCImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');
const goldPriceOracleAddress = "0xE7c03730db9c632acDa8d854971Bf81263663cEc"; 
const adminAddress = "0x417A8676ede1D52e63C913F051c169a863c018a0"; // Admin account

module.exports = async function(deployer, network, accounts) {
  try {
    // Step 1: Deploy the new UTCImplementation contract
    await deployer.deploy(UTC, goldPriceOracleAddress);
    console.log(`UTCImplementation deployed at: ${UTC.address}`);

    // Step 2: Deploy the AdminUpgradeabilityProxy contract with the address of the UTCImplementation contract
    const proxy = await deployer.deploy(Proxy, UTC.address);
    console.log(`Proxy deployed at: ${proxy.address}`);

    // Step 3: Log current admin of the proxy (it should be the deployer account)
    let currentAdmin = await proxy.admin();
    console.log(`Current Proxy admin: ${currentAdmin}`);

    // Step 4: Change the proxy admin to the designated admin
    await proxy.changeAdmin(adminAddress);
    console.log(`Admin changed to: ${adminAddress}`);

    // Step 5: Create an instance of the proxied UTCImplementation contract
    const proxiedUTC = await UTC.at(proxy.address);
    console.log(`Proxied UTCImplementation instance created at proxy address: ${proxy.address}`);
    console.log(`Proxied UTC: ${proxiedUTC}`);

    // Step 6: Initialize the proxied contract with the GoldPriceOracle address
    await proxiedUTC.initialize(goldPriceOracleAddress);
    console.log(`UTCImplementation initialized with GoldPriceOracle address: ${goldPriceOracleAddress}`);

  } catch (error) {
    console.error('Error during deployment: ', error);
  }
};
