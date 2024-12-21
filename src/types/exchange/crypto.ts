export interface CryptoCurrency {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image?: string;
}

export interface CryptoMarketData {
  totalMarketCap: number;
  totalVolume24h: number;
  btcDominance: number;
  marketCapChange24h: number;
}

export interface CryptoChartData {
  timestamp: number;
  price: number;
}

export const MOCK_TOP_CRYPTOS: CryptoCurrency[] = [
  {
    id: 'sfm',
    symbol: 'SFM',
    name: 'SFM Token',
    price: 1.23,
    change24h: 5.67,
    volume24h: 1234567,
    marketCap: 123456789
  },
  {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 52000,
    change24h: 2.5,
    volume24h: 28000000000,
    marketCap: 980000000000
  },
  {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    price: 2800,
    change24h: 3.2,
    volume24h: 15000000000,
    marketCap: 340000000000
  },
  {
    id: 'binancecoin',
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 320,
    change24h: 1.8,
    volume24h: 2500000000,
    marketCap: 52000000000
  },
  {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    price: 1.15,
    change24h: -2.1,
    volume24h: 1800000000,
    marketCap: 38000000000
  }
];