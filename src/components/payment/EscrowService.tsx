import React from 'react';
import { Shield } from 'lucide-react';

const EscrowService: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Secure Escrow Service
        </h3>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Your funds are protected with our secure escrow service
          </p>
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
      </div>
    </div>
  );
};

export default EscrowService;