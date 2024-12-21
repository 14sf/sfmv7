import React from 'react';
import { Plus, Minus, FileText, List } from 'lucide-react';
import { motion } from 'framer-motion';

interface BookActionsProps {
  onAddition: () => void;
  onSubtraction: () => void;
  onDescription: () => void;
  onChoice: () => void;
  disabled?: boolean;
}

const BookActions: React.FC<BookActionsProps> = ({
  onAddition,
  onSubtraction,
  onDescription,
  onChoice,
  disabled = false
}) => {
  const actions = [
    { icon: Plus, label: 'Addition', onClick: onAddition, color: 'text-green-600' },
    { icon: Minus, label: 'Subtraction', onClick: onSubtraction, color: 'text-red-600' },
    { icon: FileText, label: 'Description', onClick: onDescription, color: 'text-blue-600' },
    { icon: List, label: 'Choice', onClick: onChoice, color: 'text-purple-600' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(({ icon: Icon, label, onClick, color }) => (
        <motion.button
          key={label}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
          disabled={disabled}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 ${
            disabled
              ? 'border-gray-200 text-gray-400 cursor-not-allowed'
              : `border-gray-200 hover:border-gray-300 ${color} hover:bg-gray-50 dark:hover:bg-gray-700`
          } transition-colors`}
        >
          <Icon className="w-4 h-4" />
          <span className="text-sm font-medium">{label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default BookActions;