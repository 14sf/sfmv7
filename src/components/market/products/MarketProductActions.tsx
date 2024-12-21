import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { Product } from '../../../types/market';
import { useMarketActions } from '../../../hooks/market/useMarketActions';
import { useToast } from '../../../hooks/useToast';
import SFMPayButton from '../../payment/SFMPayButton';

interface MarketProductActionsProps {
  product: Product;
}

const MarketProductActions: React.FC<MarketProductActionsProps> = ({ product }) => {
  const { handleAddToWishlist, handleShare } = useMarketActions();
  const { showToast } = useToast();

  const handlePaymentSuccess = () => {
    showToast(`Successfully purchased ${product.title}!`, 'success');
  };

  const handlePaymentError = () => {
    showToast('Payment failed. Please try again.', 'error');
  };

  return (
    <div className="space-y-4 mt-4">
      <SFMPayButton 
        amount={product.price}
        onSuccess={handlePaymentSuccess}
        onError={handlePaymentError}
      />

      <div className="flex gap-2">
        <ActionButton
          icon={Heart}
          label="Wishlist"
          onClick={() => handleAddToWishlist(product)}
          color="red"
        />
        <ActionButton
          icon={Share2}
          label="Share"
          onClick={() => handleShare(product)}
          color="blue"
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  color: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  color
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:text-${color}-600 border-2 border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-700 dark:hover:text-${color}-400 transition-colors`}
  >
    <Icon className="w-4 h-4" />
    <span className="text-sm">{label}</span>
  </motion.button>
);

export default MarketProductActions;