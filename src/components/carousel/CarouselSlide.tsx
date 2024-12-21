import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface CarouselSlideProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
  image?: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({
  title,
  description,
  icon: Icon,
  features,
  image,
}) => {
  return (
    <div className="min-w-full flex flex-col md:flex-row items-center gap-8 px-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 space-y-6"
      >
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">{description}</p>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
            >
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {image && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-auto rounded-lg shadow-xl"
          />
        </motion.div>
      )}
    </div>
  );
};

export default CarouselSlide;