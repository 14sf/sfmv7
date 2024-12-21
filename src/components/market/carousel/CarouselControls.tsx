import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ onPrevious, onNext }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrevious}
        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
      </motion.button>
    </div>
  );
};

export default CarouselControls;