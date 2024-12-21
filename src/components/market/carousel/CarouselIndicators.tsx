import React from 'react';
import { motion } from 'framer-motion';

interface CarouselIndicatorsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  total,
  current,
  onChange,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          initial={false}
          animate={{
            width: current === index ? 24 : 12,
            backgroundColor: current === index 
              ? 'rgb(37, 99, 235)' 
              : 'rgb(209, 213, 219)'
          }}
          onClick={() => onChange(index)}
          className="h-3 rounded-full transition-all dark:bg-gray-600 dark:hover:bg-gray-500"
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;