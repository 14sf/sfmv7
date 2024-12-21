import { Home, Car, Briefcase, Plane } from 'lucide-react';
import { Category } from '../../types/market';

export const MARKET_CATEGORIES: Category[] = [
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