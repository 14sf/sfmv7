import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, Smartphone, Wallet } from 'lucide-react';

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

const PaymentMethodCarousel = ({ onSelect }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => 
      prev === paymentMethods.length - 1 ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? paymentMethods.length - 1 : prev - 1
    );
  };

  const method = paymentMethods[currentIndex];

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <AnimatePresence mode="wait">
        <motion.div
          key={method.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="flex flex-col items-center text-center"
        >
          <div className={`p-4 bg-${method.color}-100 dark:bg-${method.color}-900 rounded-full mb-4`}>
            <method.icon className={`w-8 h-8 text-${method.color}-600 dark:text-${method.color}-400`} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {method.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {method.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(method.id)}
            className={`px-6 py-2 bg-${method.color}-600 text-white rounded-lg hover:bg-${method.color}-700`}
          >
            Select {method.name}
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800"
        >
          <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
        <button
          onClick={next}
          className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800"
        >
          <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
        </button>
      </div>

      <div className="flex justify-center gap-2 mt-6">
        {paymentMethods.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 bg-blue-600 dark:bg-blue-400'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethodCarousel;