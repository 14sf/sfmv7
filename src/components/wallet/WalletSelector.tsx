import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronRight, AlertCircle } from 'lucide-react';
import { useWalletConnect } from '../../hooks/wallet/useWalletConnect';

const WalletSelector: React.FC = () => {
  const { connectWallet, availableWallets, walletState } = useWalletConnect();

  if (walletState.isConnected) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-px bg-gray-200 dark:bg-gray-700">
      {availableWallets.map((wallet) => (
        <motion.button
          key={wallet.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => connectWallet(wallet.id)}
          className={`flex items-center gap-3 p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
            !wallet.isInstalled() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={!wallet.isInstalled()}
        >
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {wallet.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {wallet.isInstalled() ? wallet.description : `${wallet.name} not installed`}
            </p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </motion.button>
      ))}
      
      {availableWallets.length === 0 && (
        <div className="flex items-center gap-3 p-6 bg-gray-50 dark:bg-gray-700">
          <AlertCircle className="w-6 h-6 text-gray-400" />
          <p className="text-gray-500 dark:text-gray-400">
            No compatible wallets found
          </p>
        </div>
      )}
    </div>
  );
};