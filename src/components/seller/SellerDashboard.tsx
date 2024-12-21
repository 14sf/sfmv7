import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Package, Star, DollarSign } from 'lucide-react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '../../types/market';

const SellerDashboard = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const stats = [
    { icon: Package, label: 'Total Products', value: products.length },
    { icon: Star, label: 'Rating', value: '4.8/5' },
    { icon: DollarSign, label: 'Total Sales', value: '$12,450' }
  ];

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Seller Dashboard
          </h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowProductForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Product
          </motion.button>
        </div>

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

        <ProductList products={products} onDelete={(id) => {
          setProducts(products.filter(p => p.id !== id));
        }} />

        {showProductForm && (
          <ProductForm
            onSubmit={(product) => {
              setProducts([...products, { ...product, id: Date.now().toString() }]);
              setShowProductForm(false);
            }}
            onClose={() => setShowProductForm(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;