//Use the following commands to trigger this command.
// truffle exec ./getImplementationAddress.js --network mainnet
// truffle exec ./getImplementationAddress.js --network sepolia

module.exports = function() {
  web3.eth.getStorageAt(
    // contract address
    "0xa25f0e9D205Ea819d0A6eF075Ce5D5bE084cb664",
    // implementation slot
    "0x7050c9e0f4ca769c69bd3a8ef740bc37934f8e2c036e5a723fd8ee048ed3f8c3",
    function (err, resp) {
      console.log(err, resp)
    }
  );
};
