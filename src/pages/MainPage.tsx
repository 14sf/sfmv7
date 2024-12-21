import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import SectionRenderer from '../components/sections/SectionRenderer';
import { NavigationProvider } from '../contexts/NavigationContext';

const MainPage: React.FC = () => {
  return (
    <NavigationProvider>
      <MainLayout>
        <SectionRenderer />
      </MainLayout>
    </NavigationProvider>
  );
};

export default MainPage;