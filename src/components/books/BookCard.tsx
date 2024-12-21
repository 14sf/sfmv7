import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Book as BookIcon, Plus, Minus, Upload } from 'lucide-react';
import { Book } from '../../types/book';
import TransactionsList from '../transactions/TransactionsList';
import TransactionForm from '../transactions/TransactionForm';
import DocumentUploadForm from '../documents/DocumentUploadForm';
import { useTeamAccess } from '../../hooks/useTeamAccess';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [transactionType, setTransactionType] = useState<'addition' | 'subtraction'>('addition');
  const { canCreateTransaction } = useTeamAccess(book);

  const handleAction = (type: 'add' | 'subtract' | 'upload') => {
    if (!canCreateTransaction) return;

    if (type === 'upload') {
      setShowDocumentUpload(true);
    } else {
      setTransactionType(type === 'add' ? 'addition' : 'subtraction');
      setShowTransactionForm(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-100 space-y-4 md:space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <BookIcon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-semibold text-gray-900">
              {book.name}
            </h3>
            <p className="text-sm text-gray-600">
              Balance: {book.balance} {book.currency}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 md:gap-4">
        {[
          { type: 'add', icon: Plus, label: 'Add Transaction', color: 'green' },
          { type: 'subtract', icon: Minus, label: 'Subtract Transaction', color: 'red' },
          { type: 'upload', icon: Upload, label: 'Upload Document', color: 'blue' }
        ].map(({ type, icon: Icon, label, color }) => (
          <motion.button
            key={type}
            whileHover={{ scale: canCreateTransaction ? 1.02 : 1 }}
            whileTap={{ scale: canCreateTransaction ? 0.98 : 1 }}
            onClick={() => handleAction(type as 'add' | 'subtract' | 'upload')}
            disabled={!canCreateTransaction}
            className={`flex items-center justify-center gap-2 p-3 md:p-4 rounded-lg ${
              !canCreateTransaction
                ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                : `bg-${color}-50 text-${color}-600 hover:bg-${color}-100`
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-xs md:text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Transactions List */}
      <TransactionsList book={book} />

      {/* Transaction Form Modal */}
      {showTransactionForm && (
        <TransactionForm
          book={book}
          type={transactionType}
          onClose={() => setShowTransactionForm(false)}
        />
      )}

      {/* Document Upload Modal */}
      {showDocumentUpload && (
        <DocumentUploadForm
          book={book}
          onClose={() => setShowDocumentUpload(false)}
        />
      )}
    </motion.div>
  );
};

export default BookCard;