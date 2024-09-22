module.exports = async function(callback) {
    const Proxy = artifacts.require("AdminUpgradeabilityProxy");
    try {
        const proxy = await Proxy.deployed();
        console.log("Proxy contract address:", proxy.address);
    } catch (error) {
        console.error(error);
    }
    callback();
};
