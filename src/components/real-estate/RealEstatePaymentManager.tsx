import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Shield, Calendar, DollarSign, ClipboardCheck } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface PaymentSchedule {
  frequency: 'weekly' | 'biweekly' | 'monthly';
  amount: number;
  dueDate: string;
}

interface PropertyExpense {
  type: 'cleaning' | 'security' | 'maintenance';
  amount: number;
  frequency: string;
}

const RealEstatePaymentManager = () => {
  const [propertyRef, setPropertyRef] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [schedule, setSchedule] = useState<PaymentSchedule>({
    frequency: 'monthly',
    amount: 0,
    dueDate: ''
  });
  const [expenses, setExpenses] = useState<PropertyExpense[]>([
    { type: 'cleaning', amount: 50, frequency: 'monthly' },
    { type: 'security', amount: 100, frequency: 'monthly' },
    { type: 'maintenance', amount: 200, frequency: 'quarterly' }
  ]);
  const { showToast } = useToast();

  const handlePayment = async () => {
    try {
      showToast('Processing escrow payment...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Payment processed and held in escrow!', 'success');
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Real Estate Payment Management
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Manage property payments and expenses
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payment Details */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property Reference
            </label>
            <input
              type="text"
              value={propertyRef}
              onChange={(e) => setPropertyRef(e.target.value)}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              placeholder="Enter property reference"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Total Amount (SFM)
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Schedule
            </label>
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <select
                value={schedule.frequency}
                onChange={(e) => setSchedule({ ...schedule, frequency: e.target.value as any })}
                className="flex-1 bg-transparent border-none focus:ring-0"
              >
                <option value="weekly">Weekly Payments</option>
                <option value="biweekly">Bi-weekly Payments</option>
                <option value="monthly">Monthly Payments</option>
              </select>
            </div>
          </div>
        </div>

        {/* Additional Expenses */}
        <div className="space-y-6">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Additional Expenses
          </h4>

          {expenses.map((expense) => (
            <div
              key={expense.type}
              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {expense.type}
                </span>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {expense.amount} SFM
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Billed {expense.frequency}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Escrow Information */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg space-y-3"
      >
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h4 className="font-medium text-blue-600 dark:text-blue-400">
            Secure Escrow Service
          </h4>
        </div>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
          <li>• Funds are held securely in escrow</li>
          <li>• Automatic monthly release to landlord</li>
          <li>• Protection for both parties</li>
          <li>• Transparent transaction history</li>
        </ul>
      </motion.div>

      {/* Payment Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handlePayment}
        className="w-full mt-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
      >
        <DollarSign className="w-5 h-5" />
        Process Payment
      </motion.button>
    </div>
  );
};

export default RealEstatePaymentManager;