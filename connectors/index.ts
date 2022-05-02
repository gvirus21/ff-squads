import { Web3Provider } from '@ethersproject/providers'
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { ALL_SUPPORTED_CHAIN_IDS, DEFAULT_CHAIN_ID, SupportedChainId } from '../config/chains'
import getLibrary from '../utils/getLibrary'

import { NetworkConnector } from './NetworkConnector'

const NETWORK_URLS: { [key in SupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/28d642f9130e45159a5f1d0821681918`,
}

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: DEFAULT_CHAIN_ID,
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? getLibrary(network.provider))
}

export const Injected = new InjectedConnector({ supportedChainIds: ALL_SUPPORTED_CHAIN_IDS })

export const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'DAO Memeber Directory',
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const WalletConnect = new WalletConnectConnector({
  rpc: NETWORK_URLS,
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
})

export const gnosisSafe = typeof window !== 'undefined' ? new SafeAppConnector() : null

export type ConnectorKey = 'injected' | 'walletConnect' | 'coinbaseWallet'

const connectors = {
  injected: Injected,
  walletConnect: WalletConnect,
  coinbaseWallet: CoinbaseWallet,
}

export default connectors
