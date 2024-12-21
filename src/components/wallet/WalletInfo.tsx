import React from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { WalletState } from '../../services/wallet/types';

interface WalletInfoProps {
  wallet: WalletState;
  onDisconnect: () => void;
}

const WalletInfo: React.FC<WalletInfoProps> = ({ wallet, onDisconnect }) => {
  const { showToast } = useToast();

  const copyAddress = async () => {
    if (wallet.address) {
      await navigator.clipboard.writeText(wallet.address);
      showToast('Address copied to clipboard!', 'success');
    }
  };

  const openExplorer = () => {
    if (wallet.address) {
      window.open(`https://etherscan.io/address/${wallet.address}`, '_blank');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600 dark:text-gray-400">Connected</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onDisconnect}
          className="text-sm text-red-600 dark:text-red-400 hover:text-red-700"
        >
          Disconnect
        </motion.button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Address</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-900 dark:text-white">
              {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={copyAddress}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={openExplorer}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400"
            >
              <ExternalLink className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Balance</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {wallet.balance} SFM
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">Network</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {wallet.chainId === 1 ? 'Ethereum' : 'Unknown'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletInfo;