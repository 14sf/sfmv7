import React from 'react';
import { Home, Car, Briefcase, Plane } from 'lucide-react';
import CategoryCard from './CategoryCard';
import { Category } from '../../types/market';

const categories: (Category & { icon: any })[] = [
  {
    id: 'real-estate',
    name: 'Real Estate',
    description: 'Find your dream home or sell your property',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'
  },
  {
    id: 'automotive',
    name: 'Automotive',
    description: 'Buy or sell vehicles quickly and easily',
    icon: Car,
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3'
  },
  {
    id: 'services',
    name: 'Services',
    description: 'Discover local services for your needs',
    icon: Briefcase,
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3'
  },
  {
    id: 'tourism',
    name: 'Tourism',
    description: 'Explore destinations and book unique experiences',
    icon: Plane,
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?ixlib=rb-4.0.3'
  }
];

const Categories = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              icon={category.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;