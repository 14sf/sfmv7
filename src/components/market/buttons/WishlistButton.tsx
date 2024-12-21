import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

interface WishlistButtonProps {
  productId: string;
  disabled?: boolean;
}

const WishlistButton: React.FC<WishlistButtonProps> = ({
  productId,
  disabled = false
}) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { showToast } = useToast();

  const handleWishlist = () => {
    if (disabled) return;

    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      'success'
    );
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={handleWishlist}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 p-2 rounded-lg border-2 ${
        disabled
          ? 'border-gray-200 text-gray-400 cursor-not-allowed'
          : isWishlisted
          ? 'border-red-500 bg-red-50 text-red-500'
          : 'border-red-200 hover:border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20'
      } transition-colors`}
    >
      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      <span className="text-sm font-medium">
        {isWishlisted ? 'Wishlisted' : 'Wishlist'}
      </span>
    </motion.button>
  );
};

export default WishlistButton;