import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import { Product } from '../../../types/market';
import { useMarketActions } from '../../../hooks/market/useMarketActions';
import SFMPayButton from '../../payment/SFMPayButton';

interface ProductActionsProps {
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ product }) => {
  const { handleAddToWishlist, handleShare } = useMarketActions();

  return (
    <div className="space-y-4">
      <SFMPayButton 
        amount={product.price}
        onSuccess={() => {
          // Handle successful payment
        }}
      />

      <div className="flex gap-2">
        <ActionButton
          icon={Heart}
          label="Wishlist"
          onClick={() => handleAddToWishlist(product)}
          hoverColor="red"
        />
        <ActionButton
          icon={Share2}
          label="Share"
          onClick={() => handleShare(product)}
          hoverColor="blue"
        />
      </div>
    </div>
  );
};

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  hoverColor: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  hoverColor
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:text-${hoverColor}-600 border-2 border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-700 dark:hover:text-${hoverColor}-400`}
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </motion.button>
);

export default ProductActions;