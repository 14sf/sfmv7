import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';
import CryptoList from '../exchange/CryptoList';
import { SFMWidget } from '../exchange/DodoWidget';
import MarketOverview from '../exchange/MarketOverview';
import ExchangeForm from '../exchange/ExchangeForm';
import { useCryptoData } from '../../hooks/exchange/useCryptoData';

const SFMExchange = () => {
  const { cryptos, marketData, isLoading } = useCryptoData();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ArrowLeftRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFM Exchange
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Trade SFM tokens and track crypto markets
              </p>
            </div>
          </div>
        </div>

        {/* Market Overview */}
        <MarketOverview marketData={marketData} />

        {/* Exchange Form and Crypto List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Exchange Form */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              SFM Exchange
            </h2>
            <SFMWidget />
          </div>

          {/* Crypto List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              SFM Trading Pairs
            </h2>
            <CryptoList cryptos={cryptos} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SFMExchange;