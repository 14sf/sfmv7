export interface WalletProvider {
  id: string;
  name: string;
  icon: string;
  description: string;
  isInstalled: () => boolean;
  connect: () => Promise<string>;
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  provider: WalletProvider | null;
  chainId: number | null;
  balance: string;
}

export interface WalletTransaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'failed';
}

export const SUPPORTED_WALLETS = {
  METAMASK: 'metamask',
  TRUST_WALLET: 'trustwallet',
  WALLET_CONNECT: 'walletconnect',
  COINBASE: 'coinbase',
  PHANTOM: 'phantom',
  BRAVE: 'brave'
} as const;