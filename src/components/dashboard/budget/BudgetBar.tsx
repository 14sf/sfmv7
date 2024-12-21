import React from 'react';
import { motion } from 'framer-motion';

interface BudgetBarProps {
  name: string;
  amount: number;
  total: number;
  color: string;
  delay?: number;
}

const BudgetBar: React.FC<BudgetBarProps> = ({
  name,
  amount,
  total,
  color,
  delay = 0
}) => {
  const percentage = (amount / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-2"
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {name}
        </span>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {amount.toLocaleString()}/{total.toLocaleString()} SFM
        </span>
      </div>
      <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full bg-${color}-600 rounded-full`}
        />
      </div>
    </motion.div>
  );
};

export default BudgetBar;