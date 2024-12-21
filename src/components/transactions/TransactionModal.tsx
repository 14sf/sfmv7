import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Minus, DollarSign, Upload } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import DocumentUploadModal from '../documents/DocumentUploadModal';

interface TransactionModalProps {
  type: 'addition' | 'subtraction';
  onSubmit: (data: {
    amount: number;
    description: string;
    category: string;
    attachments?: File[];
  }) => void;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  type,
  onSubmit,
  onClose
}) => {
  const [formData, setFormData] = useState({
    amount: 0,
    description: '',
    category: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      showToast('Amount must be greater than 0', 'error');
      return;
    }

    onSubmit({
      ...formData,
      attachments
    });
  };

  const handleFileUpload = (file: File) => {
    setAttachments([...attachments, file]);
    showToast('Document attached successfully!', 'success');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className={`p-2 ${
            type === 'addition'
              ? 'bg-green-100 dark:bg-green-900'
              : 'bg-red-100 dark:bg-red-900'
          } rounded-lg`}>
            {type === 'addition' ? (
              <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
            ) : (
              <Minus className="w-5 h-5 text-red-600 dark:text-red-400" />
            )}
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {type === 'addition' ? 'Add' : 'Subtract'} Transaction
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              placeholder="Enter transaction description"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700"
              required
            >
              <option value="">Select a category</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="investment">Investment</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>

          {/* Attachments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Attachments
              </label>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadModal(true)}
                className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1"
              >
                <Upload className="w-4 h-4" />
                Add Document
              </motion.button>
            </div>
            
            {attachments.length > 0 && (
              <div className="space-y-2">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {file.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                      className="text-red-600 dark:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-2 text-white rounded-lg ${
                type === 'addition'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {type === 'addition' ? 'Add' : 'Subtract'} Transaction
            </motion.button>
          </div>
        </form>
      </motion.div>

      {showUploadModal && (
        <DocumentUploadModal
          onUpload={(file, type) => {
            handleFileUpload(file);
            setShowUploadModal(false);
          }}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
};

export default TransactionModal;