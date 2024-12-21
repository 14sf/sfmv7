import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../../hooks/wallet/useWallet';

interface SFMWalletButtonProps {
  onClick?: () => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const SFMWalletButton: React.FC<SFMWalletButtonProps> = ({
  onClick,
  variant = 'default',
  size = 'md'
}) => {
  const { isConnected, address } = useWallet();

  const getButtonStyles = () => {
    const baseStyles = 'flex items-center gap-2 rounded-lg transition-colors';
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2',
      lg: 'px-6 py-3 text-lg'
    };
    
    switch (variant) {
      case 'outline':
        return `${baseStyles} ${sizeStyles[size]} border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20`;
      case 'ghost':
        return `${baseStyles} ${sizeStyles[size]} text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20`;
      default:
        return `${baseStyles} ${sizeStyles[size]} bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700`;
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={getButtonStyles()}
    >
      <Wallet className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'}`} />
      <span>
        {isConnected 
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Connect Wallet'
        }
      </span>
    </motion.button>
  );
};