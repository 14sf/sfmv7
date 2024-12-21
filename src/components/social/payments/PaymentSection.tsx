import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const PaymentSection = () => {
  const { showToast } = useToast();

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Pay with credit or debit card',
      color: 'blue'
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay with MTN or Airtel Money',
      color: 'yellow'
    },
    {
      id: 'wallet',
      name: 'Digital Wallet',
      icon: Wallet,
      description: 'Pay with Google Pay or Apple Pay',
      color: 'green'
    }
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    showToast(`Selected ${methodId} payment method`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SFMPay</h2>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <motion.button
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handlePaymentMethodSelect(method.id)}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 bg-${method.color}-100 dark:bg-${method.color}-900 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${method.color}-600 dark:text-${method.color}-400`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {method.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {method.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Transactions
        </h3>
        <div className="space-y-4">
          {[
            { id: 1, type: 'sent', amount: 100, to: 'Jane Smith', date: '2h ago' },
            { id: 2, type: 'received', amount: 250, from: 'Mike Johnson', date: '1d ago' }
          ].map((transaction) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  transaction.type === 'sent'
                    ? 'bg-red-100 dark:bg-red-900'
                    : 'bg-green-100 dark:bg-green-900'
                }`}>
                  <DollarSign className={`w-4 h-4 ${
                    transaction.type === 'sent'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-green-600 dark:text-green-400'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {transaction.type === 'sent' ? `Sent to ${transaction.to}` : `Received from ${transaction.from}`}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {transaction.date}
                  </p>
                </div>
              </div>
              <span className={`font-medium ${
                transaction.type === 'sent'
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-green-600 dark:text-green-400'
              }`}>
                {transaction.type === 'sent' ? '-' : '+'}
                {transaction.amount} SFM
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentSection;