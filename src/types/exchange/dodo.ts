export interface SFMConfig {
  apiUrl: string;
  supportedTokens: string[];
  defaultPairs: { base: string; quote: string }[];
  fees: {
    trading: number;
    withdrawal: number;
  };
  feeRecipient: string;
}

export interface SFMPair {
  id: string;
  name: string;
  baseToken: string;
  quoteToken: string;
  price: number;
  volume24h: number;
  tvl: number;
}

const SFM_PAIRS: SFMPair[] = [
  {
    id: 'sfm-usdt',
    name: 'SFM/USDT',
    baseToken: 'SFM',
    quoteToken: 'USDT',
    price: 1.23,
    volume24h: 1234567,
    tvl: 9876543
  },
  {
    id: 'sfm-eth',
    name: 'SFM/ETH',
    baseToken: 'SFM',
    quoteToken: 'ETH',
    price: 0.00043,
    volume24h: 987654,
    tvl: 8765432
  },
  {
    id: 'sfm-bnb',
    name: 'SFM/BNB',
    baseToken: 'SFM',
    quoteToken: 'BNB',
    price: 0.0038,
    volume24h: 876543,
    tvl: 7654321
  }
];

export { SFM_PAIRS };

export interface SFMPool {
  id: string;
  baseToken: string;
  quoteToken: string;
  price: number;
  volume24h: number;
  tvl: number;
  fee: number;
}

export interface SFMTrade {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  price: number;
  priceImpact: number;
  fee: number;
  route: string[];
}

export const SFM_CONFIG: SFMConfig = {
  apiUrl: 'https://api.sfmex.io/v2',
  supportedTokens: ['SFM', 'USDT', 'ETH', 'BNB', 'BUSD'],
  defaultPairs: [
    { base: 'SFM', quote: 'USDT' },
    { base: 'SFM', quote: 'ETH' },
    { base: 'SFM', quote: 'BNB' }
  ],
  fees: {
    trading: 0.002, // 0.2%
    withdrawal: 0.001 // 0.1%
  },
  feeRecipient: '0x7e0a573b3897aaab1cc4710de6402c14b851e905' // SFM Treasury
};