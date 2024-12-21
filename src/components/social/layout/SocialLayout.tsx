import React from 'react';
import SocialNavigation from '../navigation/SocialNavigation';
import SocialDashboard from '../dashboard/SocialDashboard';

const SocialLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SocialNavigation />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SocialDashboard />
      </main>
    </div>
  );
};

export default SocialLayout;