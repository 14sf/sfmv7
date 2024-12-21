import React from 'react';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';

const PaymentMethods = () => {
  const { selectedMethod, setSelectedMethod } = usePaymentMethods();

  const methods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Pay with credit or debit card'
    },
    {
      id: 'momo',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay with MTN/Airtel Money'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: Wallet,
      description: 'Fast and secure payment with Google Pay'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <method.icon className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">{method.name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;