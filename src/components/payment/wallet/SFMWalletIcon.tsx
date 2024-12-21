import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../../hooks/wallet/useWallet';

interface SFMWalletIconProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

const SFMWalletIcon: React.FC<SFMWalletIconProps> = ({
  onClick,
  size = 'md',
  showStatus = true
}) => {
  const { isConnected } = useWallet();

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-10 h-10';
    }
  };

  const getStatusSize = () => {
    switch (size) {
      case 'sm':
        return 'w-2 h-2';
      case 'lg':
        return 'w-4 h-4';
      default:
        return 'w-3 h-3';
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative"
    >
      <div className={`p-2 bg-blue-100 dark:bg-blue-900 rounded-full ${getIconSize()}`}>
        <Wallet className="w-full h-full text-blue-600 dark:text-blue-400" />
      </div>
      
      {showStatus && (
        <div className={`absolute bottom-0 right-0 ${getStatusSize()} rounded-full border-2 border-white dark:border-gray-800 ${
          isConnected 
            ? 'bg-green-500 dark:bg-green-400'
            : 'bg-gray-400 dark:bg-gray-500'
        }`} />
      )}
    </motion.button>
  );
};