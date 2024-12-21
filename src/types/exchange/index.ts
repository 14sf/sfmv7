export interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  timestamp: number;
}

export interface ExchangeTransaction {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

export interface ExchangeProvider {
  id: string;
  name: string;
  supportedCurrencies: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
}