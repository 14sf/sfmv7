import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CreditCard, Smartphone, Wallet } from 'lucide-react';
import { usePaymentForm } from '../../hooks/usePaymentForm';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { useToast } from '../../hooks/useToast';

const SfmPay = () => {
  const [step, setStep] = useState(1);
  const { formData, handleChange, validateForm } = usePaymentForm();
  const { selectedMethod, setSelectedMethod } = usePaymentMethods();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
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

  const handleNext = () => {
    if (step === 1) {
      if (!selectedMethod) {
        showToast('Please select a payment method', 'error');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        showToast('Please fill in all required fields', 'error');
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    try {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Payment processed successfully!', 'success');
      setStep(1);
      setSelectedMethod('');
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Select Payment Method
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {paymentMethods.map((method) => (
                <motion.button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedMethod === method.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <method.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    <div className="text-left">
                      <h4 className="font-medium text-gray-900 dark:text-white">{method.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  +250
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                  placeholder="7XXXXXXXX"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Payment Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Amount</span>
                <span className="font-medium text-gray-900 dark:text-white">100 SFM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Transaction Fee</span>
                <span className="font-medium text-gray-900 dark:text-white">3 SFM</span>
              </div>
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900 dark:text-white">Total</span>
                  <span className="font-bold text-gray-900 dark:text-white">103 SFM</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SFMPay</h2>
          <p className="text-gray-600 dark:text-gray-400">Simple, secure, and flexible payments</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Secure Payment</span>
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

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

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
              onClick={step === 3 ? handleSubmit : handleNext}
              disabled={isProcessing}
              className={`px-6 py-2 rounded-lg text-white ${
                isProcessing
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } ml-auto`}
            >
              {isProcessing ? 'Processing...' : step === 3 ? 'Confirm Payment' : 'Continue'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SfmPay;