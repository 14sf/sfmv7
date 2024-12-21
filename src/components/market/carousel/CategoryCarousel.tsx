import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MARKET_CATEGORIES } from '../../../utils/constants/market';
import CategorySlide from './CategorySlide';
import CarouselIndicators from './CarouselIndicators';
import CarouselControls from './CarouselControls';

const CategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let newIndex = prevIndex + newDirection;
      if (newIndex < 0) newIndex = MARKET_CATEGORIES.length - 1;
      if (newIndex >= MARKET_CATEGORIES.length) newIndex = 0;
      return newIndex;
    });
  };

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
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
            <CategorySlide category={MARKET_CATEGORIES[currentIndex]} />
          </motion.div>
        </AnimatePresence>

        <CarouselControls onPrevious={() => paginate(-1)} onNext={() => paginate(1)} />
        
        <CarouselIndicators
          total={MARKET_CATEGORIES.length}
          current={currentIndex}
          onChange={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default CategoryCarousel;