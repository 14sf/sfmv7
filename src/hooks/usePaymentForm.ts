import { useState } from 'react';
import { PaymentFormData } from '../types/payment';

export const usePaymentForm = () => {
  const [formData, setFormData] = useState<PaymentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    amount: 0,
    currency: 'SFM',
    provider: undefined
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let error = '';

    switch (field) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = `${field === 'firstName' ? 'First' : 'Last'} name is required`;
        } else if (value.length < 2) {
          error = `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!emailRegex.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'phone':
        const phoneRegex = /^7[0-9]{8}$/;
        if (!value.trim()) {
          error = 'Phone number is required';
        } else if (!phoneRegex.test(value)) {
          error = 'Please enter a valid Rwanda phone number (e.g., 7XXXXXXXX)';
        }
        break;
    }

    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    return !error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const fields = ['firstName', 'lastName', 'email', 'phone'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  return {
    formData,
    errors,
    handleChange,
    validateField,
    validateForm
  };
};