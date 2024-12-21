import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { WalletBalance as WalletBalanceType } from '../../../types/wallet';

interface WalletBalanceProps {
  balances: WalletBalanceType[];
}

const WalletBalance: React.FC<WalletBalanceProps> = ({ balances }) => {
  const totalValue = balances.reduce((sum, balance) => sum + balance.value, 0);
  const totalChange = balances.reduce((sum, balance) => sum + balance.change24h, 0) / balances.length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Wallet Balance
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {balances.map((balance) => (
          <div key={balance.currency} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {balance.currency} Balance
              </span>
              <div className={`flex items-center ${
                balance.change24h >= 0
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {balance.change24h >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                <span className="text-xs">{Math.abs(balance.change24h).toFixed(1)}%</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {balance.amount.toFixed(2)} {balance.currency}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ≈ ${balance.value.toFixed(2)} USD
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletBalance;