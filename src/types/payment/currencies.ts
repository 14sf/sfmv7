export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  region: string;
  exchangeRate: number; // Rate against SFM
  transferFee: number; // Fixed fee in SFM
  reverseCommission: number; // Commission percentage for reverse transfers
}

export const EAST_AFRICAN_CURRENCIES: Currency[] = [
  {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw',
    flag: '🇷🇼',
    region: 'Rwanda',
    exchangeRate: 1430.5864,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'UGX',
    name: 'Ugandan Shilling',
    symbol: 'USh',
    flag: '🇺🇬',
    region: 'Uganda',
    exchangeRate: 4890.3245,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'TZS',
    name: 'Tanzanian Shilling',
    symbol: 'TSh',
    flag: '🇹🇿',
    region: 'Tanzania',
    exchangeRate: 3250.7532,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    flag: '🇰🇪',
    region: 'Kenya',
    exchangeRate: 180.4321,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'BIF',
    name: 'Burundian Franc',
    symbol: 'FBu',
    flag: '🇧🇮',
    region: 'Burundi',
    exchangeRate: 2780.1234,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    region: 'Europe',
    exchangeRate: 0.92,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    region: 'United Kingdom',
    exchangeRate: 0.79,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    region: 'United States',
    exchangeRate: 1,
    transferFee: 3,
    reverseCommission: 0.008
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'Fr',
    flag: '🇨🇭',
    region: 'Switzerland',
    exchangeRate: 0.87,
    transferFee: 3,
    reverseCommission: 0.008
  }
];