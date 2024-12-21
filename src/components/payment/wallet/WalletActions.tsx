import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Repeat, Shield } from 'lucide-react';
import { useToast } from '../../../hooks/useToast';

const WalletActions = () => {
  const { showToast } = useToast();

  const handleAction = (action: string) => {
    showToast(`${action} feature coming soon!`, 'info');
  };

  const actions = [
    { id: 'send', label: 'Send', icon: ArrowUpRight, color: 'blue' },
    { id: 'receive', label: 'Receive', icon: ArrowDownRight, color: 'green' },
    { id: 'swap', label: 'Swap', icon: Repeat, color: 'purple' },
    { id: 'stake', label: 'Stake', icon: Shield, color: 'orange' }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {actions.map(({ id, label, icon: Icon, color }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleAction(label)}
          className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-${color}-50 dark:bg-${color}-900/20 text-${color}-600 dark:text-${color}-400 hover:bg-${color}-100 dark:hover:bg-${color}-900/30`}
        >
          <Icon className="w-6 h-6" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default WalletActions;