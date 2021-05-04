import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import {providerUrl} from '../config/chainIds'

const httpProvider = new Web3.providers.HttpProvider(providerUrl, { timeout: 10000 } as HttpProviderOptions)
const web3NoAccount = new Web3(httpProvider)
//console.log("web3NoAccount", web3NoAccount)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

export { getWeb3NoAccount }
export default web3NoAccount
