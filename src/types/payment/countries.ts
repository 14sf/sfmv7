export interface Country {
  code: string;
  name: string;
  continent: string;
  flag: string;
  phoneCode: string;
  mobileMoneyProviders?: string[];
}

// African Countries with Mobile Money Support
export const MTN_COUNTRIES: Country[] = [
  { code: 'BJ', name: 'Benin', continent: 'Africa', flag: '🇧🇯', phoneCode: '229', mobileMoneyProviders: ['mtn'] },
  { code: 'CM', name: 'Cameroon', continent: 'Africa', flag: '🇨🇲', phoneCode: '237', mobileMoneyProviders: ['mtn'] },
  { code: 'GH', name: 'Ghana', continent: 'Africa', flag: '🇬🇭', phoneCode: '233', mobileMoneyProviders: ['mtn'] },
  { code: 'CI', name: 'Ivory Coast', continent: 'Africa', flag: '🇨🇮', phoneCode: '225', mobileMoneyProviders: ['mtn'] },
  { code: 'RW', name: 'Rwanda', continent: 'Africa', flag: '🇷🇼', phoneCode: '250', mobileMoneyProviders: ['mtn', 'airtel'] },
  { code: 'UG', name: 'Uganda', continent: 'Africa', flag: '🇺🇬', phoneCode: '256', mobileMoneyProviders: ['mtn', 'airtel'] }
];

// All Countries
export const ALL_COUNTRIES: Country[] = [
  // Africa
  ...MTN_COUNTRIES,
  
  // Europe
  { code: 'FR', name: 'France', continent: 'Europe', flag: '🇫🇷', phoneCode: '33' },
  { code: 'DE', name: 'Germany', continent: 'Europe', flag: '🇩🇪', phoneCode: '49' },
  { code: 'CH', name: 'Switzerland', continent: 'Europe', flag: '🇨🇭', phoneCode: '41' },
  { code: 'GB', name: 'United Kingdom', continent: 'Europe', flag: '🇬🇧', phoneCode: '44' },
  
  // Americas
  { code: 'US', name: 'United States', continent: 'Americas', flag: '🇺🇸', phoneCode: '1' },
  { code: 'CA', name: 'Canada', continent: 'Americas', flag: '🇨🇦', phoneCode: '1' },
  
  // Asia
  { code: 'CN', name: 'China', continent: 'Asia', flag: '🇨🇳', phoneCode: '86' },
  { code: 'JP', name: 'Japan', continent: 'Asia', flag: '🇯🇵', phoneCode: '81' },
  { code: 'IN', name: 'India', continent: 'Asia', flag: '🇮🇳', phoneCode: '91' }
];