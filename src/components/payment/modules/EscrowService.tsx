import React from 'react';
import { Lock, ShieldCheck, AlertCircle } from 'lucide-react';

const EscrowService = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Lock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Escrow Service</h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400 mt-1" />
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-1">Secure Transaction</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Funds are held securely until all conditions are met
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Step 1</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Buyer deposits funds into escrow
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Step 2</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Seller delivers goods/services
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h5 className="font-medium text-gray-900 dark:text-white mb-2">Step 3</h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Funds released after confirmation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <p className="text-sm text-yellow-600 dark:text-yellow-400">
            Fixed fee of 3 SFM per transaction (0.002 SFM for SFM token transfers)
          </p>
        </div>
      </div>
    </div>
  );
};

export default EscrowService;