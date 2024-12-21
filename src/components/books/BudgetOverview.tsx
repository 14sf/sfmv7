import React from 'react';
import { Book } from '../../types/book';
import { motion } from 'framer-motion';

interface BudgetOverviewProps {
  selectedBook: Book | null;
}

const BudgetOverview: React.FC<BudgetOverviewProps> = ({ selectedBook }) => {
  if (!selectedBook) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
        <p className="text-gray-500 dark:text-gray-400 text-center">
          Select a book to view budget overview
        </p>
      </div>
    );
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
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Budget Overview - {selectedBook.name}
      </h3>

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {category.name}
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {category.amount.toLocaleString()}/{category.total.toLocaleString()} {selectedBook.currency}
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className={`bg-${category.color}-600 h-2 rounded-full`}
                style={{ width: `${(category.amount / category.total) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default BudgetOverview;