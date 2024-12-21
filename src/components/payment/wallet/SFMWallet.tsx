import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import WalletBalance from './WalletBalance';
import WalletActions from './WalletActions';
import WalletTransactions from './WalletTransactions';
import CreateWalletForm from './CreateWalletForm';
import { useWallet } from '../../../hooks/wallet/useWallet';
import { useToast } from '../../../hooks/useToast';

const SFMWallet = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { isConnected, connect, balances, transactions } = useWallet();
  const { showToast } = useToast();

  const handleCreateWallet = async (password: string) => {
    try {
      await connect();
      setShowCreateForm(false);
      showToast('Wallet created successfully!', 'success');
    } catch (error) {
      showToast('Failed to create wallet', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {!isConnected ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Wallet className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Create Your SFM Wallet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Securely store and manage your SFM tokens
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateForm(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Wallet
          </motion.button>
        </motion.div>
      ) : (
        <>
          <WalletBalance balances={balances} />
          <WalletActions />
          <WalletTransactions transactions={transactions} />
        </>
      )}

      {showCreateForm && (
        <CreateWalletForm
          onSubmit={handleCreateWallet}
          onClose={() => setShowCreateForm(false)}
        />
      )}
    </div>
  );
};

export default SFMWallet;