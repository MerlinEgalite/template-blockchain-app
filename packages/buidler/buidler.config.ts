import { BuidlerConfig, usePlugin } from '@nomiclabs/buidler/config'
require('dotenv').config({ path: '../../.env' })

usePlugin('@nomiclabs/buidler-waffle')
usePlugin('@nomiclabs/buidler-etherscan')
usePlugin('buidler-typechain')

const INFURA_API_KEY = process.env.INFURA_API_KEY
const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY

const config: BuidlerConfig = {
  defaultNetwork: "buidlerevm",
  solc: {
    version: "0.6.8"
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [ROPSTEN_PRIVATE_KEY || '']
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v4"
  },
  paths: {
    artifacts: '../react-app/src/contracts/src/artifacts'
  }
}

// const config: BuidlerConfig = {
//   defaultNetwork: 'buidlerevm',
//   solc: {
//     version: '0.6.8'
//   },
//   paths: {
//     artifacts: '../react-app/src/artifacts'
//   }
// }

export default config
