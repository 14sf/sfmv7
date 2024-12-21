import React from 'react';
import { motion } from 'framer-motion';
import { Broom, Shield, Tool } from 'lucide-react';

interface ExpenseProps {
  type: 'cleaning' | 'security' | 'maintenance';
  amount: number;
  frequency: string;
  onUpdate: (amount: number) => void;
}

const ExpenseCard: React.FC<ExpenseProps> = ({ type, amount, frequency, onUpdate }) => {
  const icons = {
    cleaning: Broom,
    security: Shield,
    maintenance: Tool
  };

  const Icon = icons[type];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white capitalize">
            {type}
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Billed {frequency}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => onUpdate(Number(e.target.value))}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2 dark:bg-gray-700"
          min="0"
          step="0.01"
        />
        <span className="text-gray-600 dark:text-gray-400">SFM</span>
      </div>
    </motion.div>
  );
};

export default ExpenseCard;