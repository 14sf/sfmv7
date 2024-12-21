import React from 'react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';
import BudgetBar from './budget/BudgetBar';

interface BudgetOverviewProps {
  selectedBook: Book | null;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ selectedBook }) => {
  if (!selectedBook) {
    return null;
  }

  const categories = [
    { name: 'Business Expenses', amount: 5200, total: 8000, color: 'blue' },
    { name: 'Marketing', amount: 2800, total: 3000, color: 'green' },
    { name: 'Development', amount: 4200, total: 6000, color: 'purple' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-6"
      >
        Budget Overview
      </motion.h3>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <BudgetBar
            key={category.name}
            name={category.name}
            amount={category.amount}
            total={category.total}
            color={category.color}
            delay={index * 0.1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetOverview;