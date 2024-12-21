import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, Download } from 'lucide-react';
import { TransferDetails } from '../../../types/payment/transfer';
import { useToast } from '../../../hooks/useToast';

interface TransferReceiptProps {
  transfer: TransferDetails;
  mtcn: string;
}

const TransferReceipt: React.FC<TransferReceiptProps> = ({ transfer, mtcn }) => {
  const { showToast } = useToast();

  const handleCopyMTCN = async () => {
    try {
      await navigator.clipboard.writeText(mtcn);
      showToast('MTCN copied to clipboard!', 'success');
    } catch (error) {
      showToast('Failed to copy MTCN', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
          <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Transfer Successful!
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Your money transfer has been processed successfully
        </p>
      </div>

      <div className="space-y-6">
        {/* MTCN Number */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-blue-600 dark:text-blue-400">
              Money Transfer Control Number (MTCN)
            </span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleCopyMTCN}
              className="p-1 text-blue-600 dark:text-blue-400"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
          </div>
          <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
            {mtcn}
          </p>
        </div>

        {/* Transfer Details */}
        <div className="space-y-4">
          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Amount Sent</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {transfer.amount} {transfer.currency}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Recipient</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {transfer.recipientInfo.firstName} {transfer.recipientInfo.lastName}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
            <span className="text-gray-600 dark:text-gray-400">Destination</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {transfer.recipientInfo.country}
            </span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-600 dark:text-gray-400">Status</span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-sm">
              Completed
            </span>
          </div>
        </div>

        {/* Download Receipt Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-2 py-2 border-2 border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </motion.button>
      </div>
    </div>
  );
};

export default TransferReceipt;