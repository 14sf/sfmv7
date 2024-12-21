import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  color: string;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  color,
  disabled = false
}) => (
  <motion.button
    whileHover={{ scale: disabled ? 1 : 1.02 }}
    whileTap={{ scale: disabled ? 1 : 0.98 }}
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
);

export default ActionButton;