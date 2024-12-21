import React from 'react';
import { Package, Star, DollarSign } from 'lucide-react';
import { useSellerProducts } from '../../../hooks/seller/useSellerProducts';

const SellerStats = () => {
  const { products } = useSellerProducts();

  const stats = [
    { icon: Package, label: 'Total Products', value: products.length },
    { icon: Star, label: 'Rating', value: '4.8/5' },
    { icon: DollarSign, label: 'Total Sales', value: '$12,450' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerStats;