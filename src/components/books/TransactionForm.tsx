import React, { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';

interface TransactionFormProps {
  onSubmit: (data: TransactionData) => void;
  onClose: () => void;
  type: 'addition' | 'subtraction';
}

interface TransactionData {
  amount: number;
  description: string;
  category: string;
  currency: string;
}

const currencies = [
  { code: 'SFM', name: 'SFM Token', fee: 0.002 },
  { code: 'USD', name: 'US Dollar', fee: 3 },
  { code: 'EUR', name: 'Euro', fee: 3 },
  { code: 'CHF', name: 'Swiss Franc', fee: 3 },
  { code: 'RWF', name: 'Rwandan Franc', fee: 3 }
];

const TransactionForm: React.FC<TransactionFormProps> = ({ onSubmit, onClose, type }) => {
  const [formData, setFormData] = useState<TransactionData>({
    amount: 0,
    description: '',
    category: '',
    currency: 'SFM'
  });

  const currentFee = currencies.find(c => c.code === formData.currency)?.fee || 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          {type === 'addition' ? (
            <Plus className="w-5 h-5 text-green-600" />
          ) : (
            <Minus className="w-5 h-5 text-red-600" />
          )}
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {type === 'addition' ? 'Add' : 'Subtract'} Transaction
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              >
                {currencies.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              required
            >
              <option value="">Select a category</option>
              <option value="business">Business</option>
              <option value="personal">Personal</option>
              <option value="investment">Investment</option>
            </select>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Transaction Fee: {currentFee} {formData.currency}
            </p>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white ${
              type === 'addition' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
            } transition-colors`}
          >
            {type === 'addition' ? 'Add' : 'Subtract'} Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;