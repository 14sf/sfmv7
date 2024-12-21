export type PaymentStep = 1 | 2 | 3 | 4;

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface TransactionDetails {
  id: string;
  amount: number;
  currency: string;
  timestamp: number;
}