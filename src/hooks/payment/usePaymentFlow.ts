import { useState } from 'react';
import { useToast } from '../useToast';
import { PaymentStep, PaymentMethod, TransactionDetails } from '../../types/payment';

export const usePaymentFlow = () => {
  const [step, setStep] = useState<PaymentStep>(1);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const { showToast } = useToast();

  const handleMethodSelect = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setStep(2);
  };

  const handleNext = async () => {
    if (step === 2) {
      if (!validatePaymentDetails()) {
        showToast('Please fill in all required fields correctly', 'error');
        return;
      }
    }

    if (step === 3) {
      setIsProcessing(true);
      try {
        await processPayment();
        const details = {
          id: Math.random().toString(36).substring(2, 11).toUpperCase(),
          amount: 250.00,
          currency: 'SFM',
          timestamp: Date.now()
        };
        setTransactionDetails(details);
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

  const validatePaymentDetails = () => {
    // Add validation logic here
    return true;
  };

  const processPayment = async () => {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
  };

  return {
    step,
    selectedMethod,
    isProcessing,
    transactionDetails,
    handleMethodSelect,
    handleNext,
    handleBack
  };
};