import { useState } from 'react';

export const usePaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');

  return { selectedMethod, setSelectedMethod };
};