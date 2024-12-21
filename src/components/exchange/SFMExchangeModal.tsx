import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import ExchangeForm from './ExchangeForm';
import ExchangeStats from './ExchangeStats';
import ExchangeHistory from './ExchangeHistory';

interface SFMExchangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SFMExchangeModal: React.FC<SFMExchangeModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                SFM Exchange
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Exchange SFM tokens with other currencies
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ExchangeForm />
              </div>
              <div className="space-y-6">
                <ExchangeStats />
                <ExchangeHistory transactions={[]} />
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SFMExchangeModal;