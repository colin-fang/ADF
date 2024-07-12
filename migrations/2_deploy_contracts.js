const ADF = artifacts.require('ADFImplementation');
const Proxy = artifacts.require('AdminUpgradeabilityProxy');

module.exports = async function(deployer) {
  await deployer;

  await deployer.deploy(ADF);
  const proxy = await deployer.deploy(Proxy, ADF.address);
  const proxiedADF = await ADF.at(proxy.address);
  await proxy.changeAdmin("0x417A8676ede1D52e63C913F051c169a863c018a0");
  await proxiedADF.initialize();
};
