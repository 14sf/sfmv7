import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, ChevronLeft, ChevronRight, Wallet } from 'lucide-react';
import CryptoList from './CryptoList';
import { SFMWidget } from './DodoWidget';
import MarketOverview from './MarketOverview';
import WalletCarousel from '../wallet/WalletCarousel';
import WalletInfo from '../wallet/WalletInfo';
import WalletConnect from '../wallet/WalletConnect';
import { useWalletConnect } from '../../hooks/wallet/useWalletConnect';
import { useCryptoData } from '../../hooks/exchange/useCryptoData';

const SFMExchange = () => {
  const { cryptos, marketData, isLoading } = useCryptoData();
  const { walletState } = useWalletConnect();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ArrowLeftRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFM Exchange
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Trade SFM tokens securely and efficiently
              </p>
            </div>
          </div>
          {walletState.isConnected && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Connected to {walletState.provider?.name}
              </span>
            </div>
          )}
        </div>

        {/* Market Overview */}
        <MarketOverview marketData={marketData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {/* Wallet Section */}
          <div className="lg:col-span-1 space-y-6">
            {!walletState.isConnected ? (
              <WalletConnect />
            ) : (
              <>
                <WalletInfo wallet={walletState} />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
                >
                  <SFMWidget />
                </motion.div>
              </>
            )}
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