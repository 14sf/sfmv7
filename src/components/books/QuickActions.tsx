import React from 'react';
import { Plus, Minus, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { Book } from '../../types/book';

interface QuickActionsProps {
  onAction: (type: 'add' | 'subtract' | 'upload') => void;
  disabled: boolean;
  selectedBook: Book | null;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  onAction,
  disabled,
  selectedBook
}) => {
  const actions = [
    { 
      id: 'add',
      icon: Plus,
      label: 'Add Transaction',
      color: 'green',
      onClick: () => onAction('add')
    },
    {
      id: 'subtract',
      icon: Minus,
      label: 'Subtract Transaction',
      color: 'red',
      onClick: () => onAction('subtract')
    },
    {
      id: 'upload',
      icon: Upload,
      label: 'Upload Document',
      color: 'blue',
      onClick: () => onAction('upload')
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {actions.map(({ id, icon: Icon, label, color, onClick }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 ${
              disabled
                ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                : `border-${color}-200 hover:border-${color}-300 text-${color}-600 hover:bg-${color}-50 dark:hover:bg-${color}-900/20`
            } transition-colors`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {disabled ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Select a book to perform actions
        </p>
      ) : (
        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Current Book: <span className="font-medium">{selectedBook?.name}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Balance: <span className="font-medium">{selectedBook?.balance} {selectedBook?.currency}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default QuickActions;