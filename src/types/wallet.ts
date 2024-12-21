export interface WalletTransaction {
  id: string;
  type: 'send' | 'receive' | 'swap' | 'stake' | 'exchange';
  amount: number;
  currency: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  from?: string;
  to?: string;
  fee?: number;
  exchangeRate?: number;
  exchangeCurrency?: string;
}

export interface WalletBalance {
  currency: string;
  amount: number;
  value: number; // Value in USD
  change24h: number; // 24h change percentage
  lastUpdated: number;
}

export interface Wallet {
  id: string;
  address: string;
  balances: WalletBalance[];
  transactions: WalletTransaction[];
  createdAt: number;
  lastAccessed: number;
  isLocked: boolean;
  network: string;
}