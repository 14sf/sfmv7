import { useState, useCallback } from 'react';
import { Currency } from '../../types/payment/currencies';
import Decimal from 'decimal.js';

export const useTransferCalculator = () => {
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateTransferAmount = useCallback((
    amount: number,
    currency: Currency,
    isReverse: boolean = false
  ) => {
    setIsCalculating(true);
    try {
      const amountDecimal = new Decimal(amount);
      const rateDecimal = new Decimal(currency.exchangeRate);
      const feeDecimal = new Decimal(currency.transferFee);
      const commissionDecimal = new Decimal(currency.reverseCommission);

      let result;
      if (isReverse) {
        // Calculate reverse transfer (from currency to SFM)
        const beforeCommission = amountDecimal.dividedBy(rateDecimal);
        const commission = beforeCommission.times(commissionDecimal);
        result = beforeCommission.minus(commission).minus(feeDecimal);
      } else {
        // Calculate forward transfer (from SFM to currency)
        const withoutFee = amountDecimal.minus(feeDecimal);
        result = withoutFee.times(rateDecimal);
      }

      return {
        amount: result.toDecimalPlaces(6).toNumber(),
        fee: currency.transferFee,
        commission: isReverse ? result.times(commissionDecimal).toNumber() : 0,
        rate: currency.exchangeRate
      };
    } finally {
      setIsCalculating(false);
    }
  }, []);

  return {
    isCalculating,
    calculateTransferAmount
  };
};