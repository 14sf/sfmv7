import React from 'react';
import { motion } from 'framer-motion';
import { Home, MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { useMarketProducts } from '../../../hooks/market/useMarketProducts';

const RealEstateSection = () => {
  const { products: properties, isLoading } = useMarketProducts('real-estate');

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Real Estate
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Find your dream property
              </p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Featured Properties */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            properties.map((property) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 px-2 py-1 bg-blue-600 text-white text-sm rounded">
                    For Sale
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {property.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>Kigali, Rwanda</span>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400">
                      <DollarSign className="w-5 h-5 mr-1" />
                      <span className="font-bold">
                        {property.price.toLocaleString()} SFM
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RealEstateSection;