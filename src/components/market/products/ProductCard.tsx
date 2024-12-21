import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Heart, Share2 } from 'lucide-react';
import { Product } from '../../../types/market';
import { useMarketActions } from '../../../hooks/market/useMarketActions';
import SFMPayButton from '../../payment/SFMPayButton';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleAddToWishlist, handleShare } = useMarketActions();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
      <div className="relative h-48">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
          {product.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="font-bold">{product.price.toLocaleString()} SFM</span>
          </div>
        </div>

        <div className="space-y-3">
          <SFMPayButton amount={product.price} />
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAddToWishlist(product)}
              className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:text-red-600 border-2 border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-700"
            >
              <Heart className="w-4 h-4" />
              <span className="text-sm">Wishlist</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare(product)}
              className="flex-1 flex items-center justify-center gap-2 p-2 text-gray-600 hover:text-blue-600 border-2 border-gray-200 rounded-lg dark:text-gray-400 dark:border-gray-700"
            >
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;