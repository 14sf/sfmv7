import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, DollarSign } from 'lucide-react';
import { Book } from '../../../types/book';
import { useToast } from '../../../hooks/useToast';

interface TransactionFormProps {
  book: Book;
  type: 'addition' | 'subtraction';
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  book,
  type,
  onClose
}) => {
  const [formData, setFormData] = useState({
    amount: 0,
    description: '',
    category: ''
  });
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      showToast('Amount must be greater than 0', 'error');
      return;
    }

    // In a real app, this would make an API call
    const transaction = {
      id: Date.now().toString(),
      type,
      amount: formData.amount,
      description: formData.description,
      category: formData.category,
      timestamp: Date.now(),
      createdBy: 'user@example.com'
    };

    // Update book balance and add transaction
    book.balance += type === 'addition' ? formData.amount : -formData.amount;
    book.transactions.unshift(transaction);

    showToast(`Transaction ${type === 'addition' ? 'added' : 'subtracted'} successfully!`, 'success');
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 ${
              type === 'addition'
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-red-100 dark:bg-red-900'
            } rounded-lg`}>
              {type === 'addition' ? (
                <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <Minus className="w-5 h-5 text-red-600 dark:text-red-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {type === 'addition' ? 'Add' : 'Subtract'} Transaction
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount ({book.currency})
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                placeholder="Enter transaction description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
              >
                <option value="">Select a category</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                <option value="investment">Investment</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 text-white rounded-lg ${
                  type === 'addition'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {type === 'addition' ? 'Add' : 'Subtract'} Transaction
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionForm;