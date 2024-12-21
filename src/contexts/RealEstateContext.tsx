import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RoleType } from '../types/real-estate/roles';

interface RealEstateContextType {
  currentRole: RoleType;
  setCurrentRole: (role: RoleType) => void;
}

const RealEstateContext = createContext<RealEstateContextType | undefined>(undefined);

export const useRealEstate = () => {
  const context = useContext(RealEstateContext);
  if (!context) {
    throw new Error('useRealEstate must be used within a RealEstateProvider');
  }
  return context;
};

interface RealEstateProviderProps {
  children: ReactNode;
}

export const RealEstateProvider: React.FC<RealEstateProviderProps> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<RoleType>('Owner');

  return (
    <RealEstateContext.Provider value={{ currentRole, setCurrentRole }}>
      {children}
    </RealEstateContext.Provider>
  );
};