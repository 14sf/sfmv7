import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, CreditCard, Shield, Send } from 'lucide-react';
import WalletSection from '../payment/wallet/WalletSection';
import MoneyTransferForm from '../payment/transfer/MoneyTransferForm';
import EscrowService from '../payment/EscrowService';
import { useToast } from '../../hooks/useToast';
import { useWallet } from '../../hooks/wallet/useWallet';

const SFMPay: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'wallet' | 'transfer'>('wallet');
  const { balances } = useWallet();
  const { showToast } = useToast();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFMPay
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Fast and secure payments with SFM
              </p>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Balance</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{balances[0]?.amount || 0} SFM</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">In Escrow</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">321 SFM</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Volume</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">5,678 SFM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('wallet')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'wallet'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>Wallet</span>
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('transfer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              activeTab === 'transfer'
                ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
          >
            <Send className="w-5 h-5" />
            <span>Send Money</span>
          </motion.button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Flow */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              {activeTab === 'wallet' ? (
                <WalletSection />
              ) : (
                <MoneyTransferForm />
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <EscrowService />

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Transactions
              </h3>
              <div className="space-y-4">
                {[
                  { type: 'sent', amount: 100, to: 'Jane Smith', date: '2h ago' },
                  { type: 'received', amount: 250, from: 'Mike Johnson', date: '1d ago' }
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'sent'
                          ? 'bg-red-100 dark:bg-red-900'
                          : 'bg-green-100 dark:bg-green-900'
                      }`}>
                        <Wallet className={`w-4 h-4 ${
                          transaction.type === 'sent'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {transaction.type === 'sent' ? `Sent to ${transaction.to}` : `Received from ${transaction.from}`}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                    <span className={`font-medium ${
                      transaction.type === 'sent'
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {transaction.type === 'sent' ? '-' : '+'}
                      {transaction.amount} SFM
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SFMPay;