import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, DollarSign, User, Phone, MapPin } from 'lucide-react';
import { TransferDetails } from '../../../types/payment/transfer';
import { EAST_AFRICAN_CURRENCIES } from '../../../types/payment/currencies';
import { useToast } from '../../../hooks/useToast';

const MoneyTransferForm: React.FC = () => {
  const [formData, setFormData] = useState<TransferDetails>({
    senderInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      country: 'RW',
      city: ''
    },
    recipientInfo: {
      firstName: '',
      lastName: '',
      phone: '',
      country: '',
      city: ''
    },
    amount: 0,
    currency: 'SFM',
    purpose: ''
  });
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      showToast('Processing transfer...', 'info');
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      const mtcn = Math.random().toString(36).substring(2, 11).toUpperCase();
      showToast(`Transfer successful! MTCN: ${mtcn}`, 'success');
    } catch (error) {
      showToast('Transfer failed. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Send className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Send Money
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sender Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4" />
            Sender Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.senderInfo.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  senderInfo: { ...formData.senderInfo, firstName: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.senderInfo.lastName}
                onChange={(e) => setFormData({
                  ...formData,
                  senderInfo: { ...formData.senderInfo, lastName: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                  +250
                </span>
                <input
                  type="tel"
                  value={formData.senderInfo.phone}
                  onChange={(e) => setFormData({
                    ...formData,
                    senderInfo: { ...formData.senderInfo, phone: e.target.value }
                  })}
                  className="flex-1 rounded-r-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                  placeholder="7XXXXXXXX"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.senderInfo.email}
                onChange={(e) => setFormData({
                  ...formData,
                  senderInfo: { ...formData.senderInfo, email: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4" />
            Recipient Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={formData.recipientInfo.firstName}
                onChange={(e) => setFormData({
                  ...formData,
                  recipientInfo: { ...formData.recipientInfo, firstName: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={formData.recipientInfo.lastName}
                onChange={(e) => setFormData({
                  ...formData,
                  recipientInfo: { ...formData.recipientInfo, lastName: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Country
              </label>
              <select
                value={formData.recipientInfo.country}
                onChange={(e) => setFormData({
                  ...formData,
                  recipientInfo: { ...formData.recipientInfo, country: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              >
                <option value="">Select country</option>
                {EAST_AFRICAN_CURRENCIES.map(currency => (
                  <option key={currency.code} value={currency.code}>
                    {currency.flag} {currency.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.recipientInfo.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  recipientInfo: { ...formData.recipientInfo, phone: e.target.value }
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              />
            </div>
          </div>
        </div>

        {/* Transfer Details */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Transfer Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({
                    ...formData,
                    amount: Number(e.target.value)
                  })}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Purpose of Transfer
              </label>
              <select
                value={formData.purpose}
                onChange={(e) => setFormData({
                  ...formData,
                  purpose: e.target.value
                })}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2.5 dark:bg-gray-700"
                required
              >
                <option value="">Select purpose</option>
                <option value="family">Family Support</option>
                <option value="business">Business Payment</option>
                <option value="education">Education</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Fee Information */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Transfer Fee</span>
            <span className="font-medium text-gray-900 dark:text-white">3 SFM</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Exchange Rate</span>
            <span className="font-medium text-gray-900 dark:text-white">
              1 SFM = {formData.recipientInfo.country ? 
                EAST_AFRICAN_CURRENCIES.find(c => c.code === formData.recipientInfo.country)?.exchangeRate : '0'
              } {formData.recipientInfo.country}
            </span>
          </div>
          <div className="flex justify-between text-sm pt-2 border-t border-gray-200 dark:border-gray-600">
            <span className="font-medium text-gray-900 dark:text-white">Total Amount</span>
            <span className="font-bold text-gray-900 dark:text-white">
              {(formData.amount + 3).toFixed(2)} SFM
            </span>
          </div>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Send className="w-5 h-5" />
          Send Money
        </motion.button>
      </form>
    </div>
  );
};

export default MoneyTransferForm;