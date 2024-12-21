import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to SF Market
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Your one-stop marketplace for real estate, automotive, services, and tourism
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, services, or locations..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 bg-white focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;