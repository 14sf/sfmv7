import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TransactionItemProps {
  type: 'addition' | 'subtraction';
  description: string;
  amount: number;
  timestamp: string;
  currency?: string;
  delay?: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  type,
  description,
  amount,
  timestamp,
  currency = 'SFM',
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02 }}
      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer"
    >
      <div className="flex items-center space-x-3">
        <motion.div
          whileHover={{ rotate: type === 'addition' ? 45 : -45 }}
          className={`p-2 ${
            type === 'addition' 
              ? 'bg-green-100 dark:bg-green-900'
              : 'bg-red-100 dark:bg-red-900'
          } rounded-lg`}
        >
          {type === 'addition' ? (
            <ArrowUpRight className="h-4 w-4 text-green-600 dark:text-green-400" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
          )}
        </motion.div>
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {description}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {timestamp}
          </p>
        </div>
      </div>
      <motion.span
        whileHover={{ scale: 1.1 }}
        className={`text-sm font-medium ${
          type === 'addition'
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-600 dark:text-red-400'
        }`}
      >
        {type === 'addition' ? '+' : '-'}
        {amount.toLocaleString()} {currency}
      </motion.span>
    </motion.div>
  );
};

export default TransactionItem;