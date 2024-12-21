import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ArrowRight, CreditCard } from 'lucide-react';
import PaymentMethodCarousel from './carousel/PaymentMethodCarousel';
import PaymentForm from './forms/PaymentForm';
import PaymentSummary from './forms/PaymentSummary';
import VerificationForm from './forms/VerificationForm';
import { usePaymentVerification } from '../../hooks/usePaymentVerification';
import { useToast } from '../../hooks/useToast';

const PaymentFlow = () => {
  const [step, setStep] = useState(1);
  const [selectedMethod, setSelectedMethod] = useState('');
  const { verificationData, handleChange, validateAll, errors } = usePaymentVerification();
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState({
    amount: 0,
    currency: 'CHF',
    exchangeRate: 1430.5864,
    fees: 3.99,
    receivedAmount: 0,
    mtcn: ''
  });

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(methodId);
    setStep(2);
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!validateAll()) {
        showToast('Please fill in all required fields correctly', 'error');
        return;
      }
    }

    if (step === 3) {
      setIsProcessing(true);
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        const mtcn = Math.random().toString(36).substring(2, 11).toUpperCase();
        setTransactionDetails(prev => ({
          ...prev,
          mtcn
        }));
        showToast('Payment processed successfully!', 'success');
        setStep(4);
      } catch (error) {
        showToast('Payment failed. Please try again.', 'error');
      } finally {
        setIsProcessing(false);
      }
      return;
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const renderContent = () => {
    switch (step) {
      case 1:
        return <PaymentMethodCarousel onSelect={handleMethodSelect} />;
      case 2:
        return (
          <VerificationForm
            data={verificationData}
            onChange={handleChange}
            errors={errors}
          />
        );
      case 3:
        return (
          <PaymentSummary
            details={{
              amount: 250.00,
              currency: 'CHF',
              fees: 3.99,
              exchangeRate: 1430.5864,
              receivedAmount: 357647.00,
              receivedCurrency: 'RWF'
            }}
          />
        );
      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900 rounded-full">
              <CreditCard className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Payment Successful!
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-left">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Transaction Reference (MTCN): {transactionDetails.mtcn}
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Amount Sent: {transactionDetails.amount} {transactionDetails.currency}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Fees: {transactionDetails.fees} {transactionDetails.currency}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Exchange Rate: 1 {transactionDetails.currency} = {transactionDetails.exchangeRate} RWF
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  Amount Received: {transactionDetails.receivedAmount} RWF
                </p>
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SFMPay</h2>
          <p className="text-gray-600 dark:text-gray-400">Simple, secure, and flexible payments</p>
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
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="min-h-[400px]"
            >
              {renderContent()}
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
                {isProcessing ? (
                  'Processing...'
                ) : step === 3 ? (
                  'Confirm Payment'
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFlow;