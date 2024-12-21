import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentDetails from './PaymentDetails';
import PaymentSummary from './PaymentSummary';
import PaymentConfirmation from './PaymentConfirmation';
import { usePaymentFlow } from '../../../hooks/payment/usePaymentFlow';
import { PaymentStep } from '../../../types/payment';

const PaymentFlow = () => {
  const {
    step,
    selectedMethod,
    transactionDetails,
    handleMethodSelect,
    handleNext,
    handleBack,
    isProcessing
  } = usePaymentFlow();

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            SFMPay
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Simple, secure, and flexible payments
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          {step < 4 && (
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full ${
                      i === step
                        ? 'bg-blue-600 dark:bg-blue-400'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[400px]"
            >
              {step === 1 && (
                <PaymentMethodSelector
                  selectedMethod={selectedMethod}
                  onSelect={handleMethodSelect}
                />
              )}
              {step === 2 && <PaymentDetails />}
              {step === 3 && <PaymentSummary />}
              {step === 4 && (
                <PaymentConfirmation details={transactionDetails} />
              )}
            </motion.div>
          </AnimatePresence>

          {step < 4 && (
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="px-6 py-2 text-gray-600 dark:text-gray-400"
                >
                  Back
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                disabled={isProcessing}
                className={`ml-auto flex items-center gap-2 px-6 py-2 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white rounded-lg`}
              >
                {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Payment' : 'Continue'}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFlow;