import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { Provider } from '../../../types/payment';

interface ProviderSelectProps {
  providers: Provider[];
  selectedProvider: string;
  onSelect: (providerId: string) => void;
}

const ProviderSelect: React.FC<ProviderSelectProps> = ({
  providers,
  selectedProvider,
  onSelect
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {providers.map((provider) => (
        <motion.button
          key={provider.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(provider.name)}
          className={`flex items-center gap-3 p-3 rounded-lg border-2 ${
            selectedProvider === provider.name
              ? `border-${provider.color}-500 bg-${provider.color}-50 dark:bg-${provider.color}-900/20`
              : 'border-gray-200 dark:border-gray-700'
          }`}
        >
          <Smartphone className={`w-5 h-5 text-${provider.color}-600 dark:text-${provider.color}-400`} />
          <span className="font-medium">{provider.name}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default ProviderSelect;