import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Tag, MapPin, Calendar } from 'lucide-react';
import { Product } from '../../../types/market';
import { formatCurrency } from '../../../utils/format';

interface ListItemProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ListItem: React.FC<ListItemProps> = ({ product, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onSelect(product)}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden cursor-pointer"
    >
      <div className="flex">
        {/* Image */}
        <div className="w-32 h-32 sm:w-48 sm:h-48">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.title}
                </h3>
                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full">
                  {product.category}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>
            </div>

            {/* Details */}
            <div className="mt-auto">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{formatCurrency(product.price)} SFM</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(product.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Tag className="w-4 h-4 mr-1" />
                  <span>{product.status}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ListItem;