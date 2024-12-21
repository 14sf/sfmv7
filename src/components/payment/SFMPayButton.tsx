import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

interface SFMPayButtonProps {
  amount: number;
  onSuccess?: () => void;
  onError?: () => void;
}

const SFMPayButton: React.FC<SFMPayButtonProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const { showToast } = useToast();

  const handlePayment = async () => {
    try {
      // Simulate payment processing
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handlePayment}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <CreditCard className="w-4 h-4" />
      <span>Pay {amount.toLocaleString()} SFM</span>
    </motion.button>
  );
};

export default SFMPayButton;