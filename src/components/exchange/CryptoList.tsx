import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoCurrency } from '../../types/exchange/crypto';
import { DODO_PAIRS } from '../../types/exchange/dodo';
import { formatCurrency } from '../../utils/format';

interface CryptoListProps {
  cryptos: CryptoCurrency[];
  isLoading: boolean;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400">
            <th className="px-4 py-3">Pair</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">24h %</th>
            <th className="px-4 py-3">Volume (24h)</th>
            <th className="px-4 py-3">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptos.map((crypto, index) => (
            <motion.tr
              key={crypto.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <td className="px-4 py-4 whitespace-nowrap">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-sm font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
                >
                  {`${crypto.symbol}/SFM`}
                </motion.div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  {crypto.image && (
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="w-6 h-6 rounded-full"
                    />
                  )}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {crypto.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {crypto.symbol}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-medium text-gray-900 dark:text-white">
                ${formatCurrency(crypto.price)}
              </td>
              <td className="px-4 py-4">
                <div className={`flex items-center gap-1 ${
                  crypto.change24h >= 0
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {crypto.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {Math.abs(crypto.change24h).toFixed(2)}%
                </div>
              </td>
              <td className="px-4 py-4 text-gray-900 dark:text-white">
                ${formatCurrency(crypto.volume24h)}
              </td>
              <td className="px-4 py-4 text-gray-900 dark:text-white">
                ${formatCurrency(crypto.marketCap)}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoList;