export interface PaymentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  provider?: string;
}

export interface PaymentValidation {
  [key: string]: (value: string) => string | null;
}

export const PAYMENT_VALIDATION: PaymentValidation = {
  firstName: (value: string) => {
    if (!value.trim()) return 'First name is required';
    if (value.length < 2) return 'First name must be at least 2 characters';
    return null;
  },
  lastName: (value: string) => {
    if (!value.trim()) return 'Last name is required';
    if (value.length < 2) return 'Last name must be at least 2 characters';
    return null;
  },
  email: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return 'Email is required';
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return null;
  },
  phone: (value: string) => {
    const phoneRegex = /^7[0-9]{8}$/;
    if (!value.trim()) return 'Phone number is required';
    if (!phoneRegex.test(value)) return 'Please enter a valid Rwanda phone number (e.g., 7XXXXXXXX)';
    return null;
  }
};