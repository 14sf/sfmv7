import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { WalletTransaction } from '../../services/wallet/types';
import { formatDate } from '../../utils/format';

interface WalletTransactionsProps {
  transactions: WalletTransaction[];
}

const WalletTransactions: React.FC<WalletTransactionsProps> = ({ transactions }) => {
  return (
    <div className="space-y-4">
      {transactions.map((tx, index) => (
        <motion.div
          key={tx.hash}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              tx.from === tx.to
                ? 'bg-purple-100 dark:bg-purple-900'
                : tx.status === 'confirmed'
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-red-100 dark:bg-red-900'
            }`}>
              {tx.from === tx.to ? (
                <ArrowUpRight className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-green-600 dark:text-green-400" />
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {tx.from === tx.to ? 'Self Transfer' : `Transfer to ${tx.to.slice(0, 6)}...${tx.to.slice(-4)}`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(tx.timestamp)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900 dark:text-white">
              {tx.value} SFM
            </p>
            <p className={`text-sm ${
              tx.status === 'confirmed'
                ? 'text-green-600 dark:text-green-400'
                : tx.status === 'failed'
                ? 'text-red-600 dark:text-red-400'
                : 'text-yellow-600 dark:text-yellow-400'
            }`}>
              {tx.status}
            </p>
          </div>
        </motion.div>
      ))}

      {transactions.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            No transactions yet
          </p>
        </div>
      )}
    </div>
  );
};

export default WalletTransactions;