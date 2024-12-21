import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { features } from './carouselData';

const SimpleCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < features.length) {
      setCurrentIndex(newIndex);
    }
  };

  const feature = features[currentIndex];
  const Icon = feature.icon;

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
                <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.features.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 dark:text-gray-300"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
          <button
            onClick={() => paginate(-1)}
            disabled={currentIndex === 0}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentIndex === features.length - 1}
            className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-gray-800 dark:text-white" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-blue-600 dark:bg-blue-400 w-6'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleCarousel;