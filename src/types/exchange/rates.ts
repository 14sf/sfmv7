export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: number;
  change24h: number;
  volume24h: number;
}

export interface ExchangePair {
  base: string;
  quote: string;
  minAmount: number;
  maxAmount: number;
  fee: number;
  rate: number;
}

export const SUPPORTED_PAIRS: ExchangePair[] = [
  {
    base: 'SFM',
    quote: 'RWF',
    minAmount: 1,
    maxAmount: 1000000,
    fee: 0.002,
    rate: 1430.5864
  },
  {
    base: 'SFM',
    quote: 'USD',
    minAmount: 1,
    maxAmount: 1000000,
    fee: 0.002,
    rate: 1.2345
  },
  {
    base: 'SFM',
    quote: 'EUR',
    minAmount: 1,
    maxAmount: 1000000,
    fee: 0.002,
    rate: 1.1234
  },
  {
    base: 'SFM',
    quote: 'CHF',
    minAmount: 1,
    maxAmount: 1000000,
    fee: 0.002,
    rate: 1.0987
  }
];