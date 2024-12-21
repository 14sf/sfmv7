import React from 'react';
import { Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import { AFRICAN_COUNTRIES, MOBILE_MONEY_PROVIDERS } from '../../../types/payment';

interface MobileMoneyFormProps {
  selectedProvider: string;
  selectedCountry: string;
  onProviderChange: (provider: string) => void;
  onCountryChange: (country: string) => void;
}

const MobileMoneyForm: React.FC<MobileMoneyFormProps> = ({
  selectedProvider,
  selectedCountry,
  onProviderChange,
  onCountryChange
}) => {
  const availableProviders = Object.entries(MOBILE_MONEY_PROVIDERS)
    .filter(([_, provider]) => provider.countries.includes(selectedCountry));

  const selectedCountryData = AFRICAN_COUNTRIES.find(c => c.code === selectedCountry);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mobile Money Provider
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableProviders.map(([code, provider]) => (
            <motion.button
              key={code}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onProviderChange(code)}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
                selectedProvider === code
                  ? `border-${provider.color}-500 bg-${provider.color}-50 dark:bg-${provider.color}-900/20`
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <Smartphone className={`w-5 h-5 text-${provider.color}-600 dark:text-${provider.color}-400`} />
              <span className="font-medium">{provider.name}</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Country
        </label>
        <select
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
        >
          {AFRICAN_COUNTRIES.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} (+{country.phoneCode})
            </option>
          ))}
        </select>
        {selectedCountryData && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Available providers: {selectedCountryData.mobileMoneyProviders.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
};

export default MobileMoneyForm;