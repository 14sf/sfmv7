import React from 'react';
import { motion } from 'framer-motion';
import { ALL_COUNTRIES } from '../../../types/payment';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
  label: string;
  countries?: typeof ALL_COUNTRIES;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  label,
  countries = ALL_COUNTRIES
}) => {
  const continents = Array.from(
    new Set(countries.map(country => country.continent))
  ).sort();

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
        >
          <option value="">Select a country</option>
          {continents.map(continent => (
            <optgroup key={continent} label={continent}>
              {countries
                .filter(country => country.continent === continent)
                .map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name} (+{country.phoneCode})
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </motion.div>
    </div>
  );
};

export default CountrySelect;