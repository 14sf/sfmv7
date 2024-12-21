import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

interface SFMExchangeButtonProps {
  onClick: () => void;
}

const SFMExchangeButton: React.FC<SFMExchangeButtonProps> = ({ onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700"
    >
      <ArrowLeftRight className="w-5 h-5" />
      <span>SFM Exchange</span>
    </motion.button>
  );
};

export default SFMExchangeButton;