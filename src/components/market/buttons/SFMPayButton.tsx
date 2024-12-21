import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface SFMPayButtonProps {
  amount: number;
  onSuccess?: () => void;
  onError?: () => void;
  disabled?: boolean;
}

const SFMPayButton: React.FC<SFMPayButtonProps> = ({
  amount,
  onSuccess,
  onError,
  disabled = false
}) => {
  const { showToast } = useToast();

  const handlePayment = async () => {
    if (disabled) return;

    try {
      showToast('Processing payment...', 'info');
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      showToast('Payment successful!', 'success');
      onSuccess?.();
    } catch (error) {
      showToast('Payment failed. Please try again.', 'error');
      onError?.();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handlePayment}
      disabled={disabled}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700'
      } text-white transition-colors`}
    >
      <CreditCard className="w-4 h-4" />
      <span>Pay {amount.toLocaleString()} SFM</span>
    </motion.button>
  );
};

export default SFMPayButton;