import React from 'react';
import MarketHeader from './header/MarketHeader';
import RealEstateSection from './sections/RealEstateSection';
import { useMarket } from '../../hooks/useMarket';

const MarketDashboard = () => {
  const { selectedCategory, setSelectedCategory } = useMarket();

  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900">
      <MarketHeader />
      <RealEstateSection />
      {/* Add other category sections here */}
    </div>
  );
};

export default MarketDashboard;