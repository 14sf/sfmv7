import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, DollarSign } from 'lucide-react';
import { Product } from '../../types/market';
import { formatCurrency } from '../../utils/format';

interface SellerProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const SellerProductCard: React.FC<SellerProductCardProps> = ({
  product,
  onEdit,
  onDelete
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm"
    >
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-blue-600 dark:text-blue-400">
            <DollarSign className="w-5 h-5 mr-1" />
            <span className="font-bold">{formatCurrency(product.price)}</span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg dark:text-blue-400 dark:hover:bg-blue-900/20"
            >
              <Edit2 className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(product.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SellerProductCard;