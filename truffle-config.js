var HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const { MNEMONIC, ALCHEMY_API_KEY } = process.env;
//console.log("MNEMONIC:", process.env.MNEMONIC);
//console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);
const walletChildNum = 0;
const networkAddress = "https://mainnet.infura.io/v3/<your-api-key>";
const goerliNetworkAddress = "https://goerli.infura.io/v3/<your-api-key>";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
networks: {
    development: {
      host: '127.0.0.1',
      port: 7545, // ganache-cli
      network_id: '*', // Match any network id
      gas: 6700000,
      gasPrice: 669921875
    },
    sepolia: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: MNEMONIC
        },
        providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
        
      }),
      network_id: 11155111, // Sepolia's network id
      gas: 8000000,     // Gas limit
      gasPrice: 10000000000, // Gas price in wei (10 gwei)
      timeoutBlocks: 200,    // Increase the timeout for deploying
      networkCheckTimeout: 1000000, // Increase the network check timeout
      skipDryRun: true      // Skip the dry run before migrations (default: false for public nets)
    
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8321,
      gas: 10000000000000,
      gasPrice: 0x01
    },
    goerli: {
      network_id: 5,
      provider: function() {
        return new HDWalletProvider(mnemonic, goerliNetworkAddress, walletChildNum)
      },
      gas: 4700000,
      gasPrice: 0x01
    },
    mainnet: {
      network_id: 1,
      provider: function () {
        return new HDWalletProvider(mnemonic, networkAddress, walletChildNum)
      },
    },
  },
  compilers: {
    solc: {
      version: "v0.4.24+commit.e67f0147"  // ex:  "0.4.20". (Default: Truffle's installed solc)
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
