import React from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowUpRight, ArrowDownRight, Repeat, Shield } from 'lucide-react';
import { useWallet } from '../../../hooks/wallet/useWallet';
import { useToast } from '../../../hooks/useToast';

const WalletSection: React.FC = () => {
  const { balances, sendTransaction } = useWallet();
  const { showToast } = useToast();

  const actions = [
    { id: 'send', label: 'Send', icon: ArrowUpRight, color: 'blue' },
    { id: 'receive', label: 'Receive', icon: ArrowDownRight, color: 'green' },
    { id: 'swap', label: 'Swap', icon: Repeat, color: 'purple' },
    { id: 'stake', label: 'Stake', icon: Shield, color: 'orange' }
  ];

  const handleAction = (actionId: string) => {
    showToast(`${actionId} feature coming soon!`, 'info');
  };

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              SFM Balance
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {balances[0]?.amount || 0} SFM
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map(({ id, label, icon: Icon, color }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleAction(id)}
            className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default WalletSection;