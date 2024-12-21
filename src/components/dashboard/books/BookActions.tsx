import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Upload } from 'lucide-react';
import { Book } from '../../../types/book';
import { useTeamAccess } from '../../../hooks/useTeamAccess';

interface BookActionsProps {
  book: Book;
  onAction: (action: 'add' | 'subtract' | 'upload') => void;
}

const BookActions: React.FC<BookActionsProps> = ({ book, onAction }) => {
  const { canCreateTransaction } = useTeamAccess(book);

  const actions = [
    {
      type: 'add' as const,
      icon: Plus,
      label: 'Add Transaction',
      color: 'green',
      disabled: !canCreateTransaction
    },
    {
      type: 'subtract' as const,
      icon: Minus,
      label: 'Subtract Transaction',
      color: 'red',
      disabled: !canCreateTransaction
    },
    {
      type: 'upload' as const,
      icon: Upload,
      label: 'Upload Document',
      color: 'blue',
      disabled: !canCreateTransaction
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map(({ type, icon: Icon, label, color, disabled }) => (
        <motion.button
          key={type}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}
          onClick={() => !disabled && onAction(type)}
          disabled={disabled}
          className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg ${
            disabled
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : `bg-${color}-50 text-${color}-600 hover:bg-${color}-100`
          }`}
        >
          <Icon className="w-5 h-5" />
          <span className="text-sm font-medium text-center">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default BookActions;