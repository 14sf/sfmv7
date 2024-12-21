import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import SFMWalletComponent from '../payment/wallet/SFMWallet';
import { useWallet } from '../../hooks/wallet/useWallet';

const SFMWallet = () => {
  const { isConnected } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFM Wallet
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {isConnected 
                  ? 'Manage your SFM tokens and transactions'
                  : 'Connect your wallet to get started'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <SFMWalletComponent />
        </motion.div>
      </div>
    </div>
  );
};

export default SFMWallet;