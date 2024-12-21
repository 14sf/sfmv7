import React from 'react';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import PaymentForm from '../forms/PaymentForm';
import PaymentMethods from '../forms/PaymentMethods';
import PaymentSummary from '../forms/PaymentSummary';

const PaymentDashboard = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">SFMPay</h2>
          <p className="text-gray-600 dark:text-gray-400">Simple, secure, and flexible payments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <PaymentForm />
            <PaymentMethods />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PaymentSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;