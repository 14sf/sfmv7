import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ChevronRight } from 'lucide-react';
import WalletSelector from './WalletSelector';
import WalletInfo from './WalletInfo';
import { useWalletConnect } from '../../hooks/wallet/useWalletConnect';

const WalletConnect: React.FC = () => {
  const { walletState, disconnectWallet } = useWalletConnect();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {!walletState.isConnected ? (
        <>
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Connect Wallet
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose your preferred wallet to start trading
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
          <WalletSelector />
        </>
      ) : (
        <WalletInfo wallet={walletState} onDisconnect={disconnectWallet} />
      )}
    </div>
  );
};

export default WalletConnect;