import React from 'react';
import { Phone } from 'lucide-react';
import { Country } from '../../../types/payment';

interface PhoneInputProps {
  country: Country;
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  country,
  value,
  onChange,
  label
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
          +{country.phoneCode}
        </span>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
          placeholder="Enter phone number"
        />
      </div>
    </div>
  );
};

export default PhoneInput;