import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus, Upload } from 'lucide-react';
import { Book } from '../../../types/book';

interface QuickActionsProps {
  selectedBook: Book | null;
  onAction: (type: 'add' | 'subtract' | 'upload') => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({
  selectedBook,
  onAction
}) => {
  const actions = [
    {
      type: 'add' as const,
      icon: Plus,
      label: 'Add Transaction',
      color: 'green'
    },
    {
      type: 'subtract' as const,
      icon: Minus,
      label: 'Subtract Transaction',
      color: 'red'
    },
    {
      type: 'upload' as const,
      icon: Upload,
      label: 'Upload Document',
      color: 'blue'
    }
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {actions.map(({ type, icon: Icon, label, color }) => (
        <motion.button
          key={type}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAction(type)}
          disabled={!selectedBook}
          className={`flex items-center justify-center gap-2 p-3 rounded-lg ${
            !selectedBook
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : `bg-${color}-50 text-${color}-600 hover:bg-${color}-100`
          }`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;