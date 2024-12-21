import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PostActionButtonProps {
  icon: LucideIcon;
  label: string;
  count?: number;
  onClick: () => void;
  color?: string;
}

const PostActionButton: React.FC<PostActionButtonProps> = ({
  icon: Icon,
  label,
  count,
  onClick,
  color = 'blue'
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 text-gray-500 hover:text-${color}-500 dark:text-gray-400`}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      {count !== undefined && <span>{count}</span>}
    </motion.button>
  );
};

export default PostActionButton;