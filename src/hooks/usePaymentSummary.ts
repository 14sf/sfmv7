import { useState, useEffect } from 'react';

export const usePaymentSummary = () => {
  const [amount, setAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Calculate fees based on payment method and amount
    const calculatedFees = amount === 'SFM' ? 0.002 : 3;
    setFees(calculatedFees);
    setTotal(Number(amount) + calculatedFees);
  }, [amount]);

  return { amount, fees, total };
};