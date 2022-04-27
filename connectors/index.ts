import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

const Injected = new InjectedConnector({ supportedChainIds: [1, 42, 1337] });

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
  appName: 'DAO Memeber Directory',
  supportedChainIds: [1, 3, 4, 5, 42],
});

const WalletConnect = new WalletConnectConnector({
  rpc: { 1: `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}` },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
});

export type ConnectorKey = 'injected' | 'walletConnect' | 'coinbaseWallet';

const connectors = {
  injected: Injected,
  walletConnect: WalletConnect,
  coinbaseWallet: CoinbaseWallet,
};

export default connectors;
