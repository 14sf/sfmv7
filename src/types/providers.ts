// Provider Types and Data
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
    countries: ['RW', 'GH', 'UG', 'CI', 'CM', 'BJ', 'CG'],
    fees: {
      percentage: 0.5,
      fixed: 3
    }
  },
  airtel: {
    name: 'Airtel Money',
    color: 'red',
    countries: ['RW', 'UG', 'TZ', 'KE', 'MW', 'ZM'],
    fees: {
      percentage: 0.5,
      fixed: 3
    }
  }
};

// Helper Functions
export const getMobileMoneyProviders = (countryCode: string): Provider[] => {
  const country = AFRICAN_COUNTRIES.find(c => c.code === countryCode);
  if (!country?.mobileMoneyProviders) return [];
  
  return country.mobileMoneyProviders.map(code => MOBILE_MONEY_PROVIDERS[code]);
};

export const calculateFees = (amount: number, provider: string): number => {
  const providerData = MOBILE_MONEY_PROVIDERS[provider];
  if (!providerData) return 3; // Default fee
  
  return (amount * providerData.fees.percentage / 100) + providerData.fees.fixed;
};