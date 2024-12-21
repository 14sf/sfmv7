import React from 'react';
import { Home, DollarSign, Users, Wrench } from 'lucide-react';
import StatCard from './StatCard';

const PropertyStats = () => {
  const stats = [
    {
      icon: Home,
      label: 'Total Properties',
      value: '12',
      color: 'blue'
    },
    {
      icon: DollarSign,
      label: 'Monthly Revenue',
      value: '24,500 SFM',
      color: 'green'
    },
    {
      icon: Users,
      label: 'Active Tenants',
      value: '18',
      color: 'purple'
    },
    {
      icon: Wrench,
      label: 'Maintenance Requests',
      value: '5',
      color: 'orange'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard
          key={stat.label}
          {...stat}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};

export default PropertyStats;