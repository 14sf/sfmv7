import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BarChart2, Bitcoin } from 'lucide-react';
import { CryptoMarketData } from '../../types/exchange/crypto';
import { formatCurrency } from '../../utils/format';

interface MarketOverviewProps {
  marketData: CryptoMarketData;
}

const MarketOverview: React.FC<MarketOverviewProps> = ({ marketData }) => {
  const stats = [
    {
      label: 'Total Market Cap',
      value: `$${formatCurrency(marketData.totalMarketCap)}`,
      change: marketData.marketCapChange24h,
      icon: DollarSign
    },
    {
      label: '24h Volume',
      value: `$${formatCurrency(marketData.totalVolume24h)}`,
      change: 2.5,
      icon: BarChart2
    },
    {
      label: 'BTC Dominance',
      value: `${marketData.btcDominance.toFixed(1)}%`,
      change: -0.8,
      icon: Bitcoin
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between">
              <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <div className={`flex items-center ${
                stat.change >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4 mr-1" />
                <span className="text-sm">{Math.abs(stat.change)}%</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">
              {stat.value}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MarketOverview;