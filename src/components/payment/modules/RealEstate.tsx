import React from 'react';
import { Home, Calendar, Shield } from 'lucide-react';
import { usePaymentForm } from '../../../hooks/usePaymentForm';

const RealEstatePayment = () => {
  const { formData, handleChange } = usePaymentForm();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Real Estate Payment</h3>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Property Reference
            </label>
            <input
              type="text"
              name="propertyRef"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
              placeholder="Enter property reference"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Payment Type
            </label>
            <select
              name="paymentType"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
            >
              <option value="rent">Monthly Rent</option>
              <option value="deposit">Security Deposit</option>
              <option value="utilities">Utilities</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Payment Schedule
          </label>
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <Calendar className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <div className="flex-1">
              <select
                name="schedule"
                className="w-full bg-transparent border-none focus:ring-0"
              >
                <option value="full">Full Payment</option>
                <option value="split2">Split in 2 payments</option>
                <option value="split3">Split in 3 payments</option>
                <option value="split4">Split in 4 payments</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Payments are held in escrow until property verification
          </p>
        </div>
      </form>
    </div>
  );
};

export default RealEstatePayment;