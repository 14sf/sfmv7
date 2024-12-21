import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useWallet } from '../../hooks/wallet/useWallet';
import { useToast } from '../../hooks/useToast';

const WalletButton = () => {
  const { isConnected, connect, address } = useWallet();
  const { showToast } = useToast();

  const handleClick = async () => {
    if (!isConnected) {
      try {
        await connect();
      } catch (error) {
        showToast('Failed to connect wallet', 'error');
      }
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      <Wallet className="w-5 h-5" />
      <span>
        {isConnected 
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Connect Wallet'
        }
      </span>
    </motion.button>
  );
};