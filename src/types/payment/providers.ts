import { Country } from './countries';

export interface Provider {
  name: string;
  color: string;
  countries: string[];
  fees: {
    percentage: number;
    fixed: number;
  };
}

export const MOBILE_MONEY_PROVIDERS: Record<string, Provider> = {
  mtn: {
    name: 'MTN Mobile Money',
    color: 'yellow',
    countries: ['RW', 'GH', 'UG', 'CI', 'CM', 'BJ'],
    fees: {
      percentage: 0.5,
      fixed: 3
    }
  },
  airtel: {
    name: 'Airtel Money',
    color: 'red',
    countries: ['RW', 'UG', 'KE', 'TZ'],
    fees: {
      percentage: 0.5,
      fixed: 3
    }
  }
};

export const getMobileMoneyProviders = (countryCode: string): Provider[] => {
  return Object.values(MOBILE_MONEY_PROVIDERS).filter(provider =>
    provider.countries.includes(countryCode)
  );
};

export const calculateFees = (amount: number, provider: string): number => {
  const providerData = MOBILE_MONEY_PROVIDERS[provider];
  if (!providerData) return 3; // Default fee
  
  return (amount * providerData.fees.percentage / 100) + providerData.fees.fixed;
};