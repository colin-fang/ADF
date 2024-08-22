const UTC = artifacts.require('UTCImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');

module.exports = async function(deployer) {
  await deployer;

  await deployer.deploy(UTC);
  const proxy = await deployer.deploy(Proxy, UTC.address);
  const proxiedUTC = await UTC.at(proxy.address);
  await proxy.changeAdmin("0x417A8676ede1D52e63C913F051c169a863c018a0");
  await proxiedUTC.initialize();
};
