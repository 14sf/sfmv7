import { useState } from 'react';
import { PaymentVerification, VALIDATION_RULES, ERROR_MESSAGES } from '../types/payment';

export const usePaymentVerification = () => {
  const [verificationData, setVerificationData] = useState<PaymentVerification>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    idType: 'passport',
    idNumber: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      country: '',
      postalCode: ''
    }
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case 'email':
        if (!VALIDATION_RULES.EMAIL_REGEX.test(value)) {
          return ERROR_MESSAGES.INVALID_EMAIL;
        }
        break;
      case 'phone':
        if (!VALIDATION_RULES.PHONE_REGEX.test(value)) {
          return ERROR_MESSAGES.INVALID_PHONE;
        }
        break;
      case 'dateOfBirth':
        const age = new Date().getFullYear() - new Date(value).getFullYear();
        if (age < VALIDATION_RULES.MIN_AGE) {
          return ERROR_MESSAGES.INVALID_AGE;
        }
        break;
      case 'idNumber':
        if (value.length < VALIDATION_RULES.ID_NUMBER_MIN_LENGTH) {
          return ERROR_MESSAGES.INVALID_ID;
        }
        break;
    }
    return null;
  };

  const handleChange = (field: string, value: any) => {
    setVerificationData(prev => ({
      ...prev,
      [field]: value
    }));

    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.entries(verificationData).forEach(([field, value]) => {
      if (!value) {
        newErrors[field] = ERROR_MESSAGES.REQUIRED;
        isValid = false;
      } else {
        const error = validateField(field, value);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  return {
    verificationData,
    errors,
    handleChange,
    validateAll
  };
};