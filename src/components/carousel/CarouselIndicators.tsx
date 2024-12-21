import React from 'react';

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
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-3 h-3 rounded-full transition-all ${
            current === index
              ? 'bg-blue-600 dark:bg-blue-400 w-6'
              : 'bg-gray-300 dark:bg-gray-600'
          }`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;