// Re-export all payment-related types and constants
export * from './countries';
export * from './providers';
export * from './validation';

// Payment Method Types
export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  color?: string;
}

export interface PaymentFormData {
  firstName: string;
  lastName: string;
  senderCountry: string;
  receiverCountry: string;
  senderPhone: string;
  receiverPhone: string;
  amount: number;
  currency: string;
  provider?: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  method: string;
  timestamp: number;
  sender: {
    name: string;
    phone: string;
    country: string;
  };
  receiver: {
    name: string;
    phone: string;
    country: string;
  };
}

// Payment Status Types
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

// Payment Provider Types
export type PaymentProvider = 'mtn' | 'airtel' | 'card' | 'googlepay';