export interface TransferDetails {
  senderInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
  };
  recipientInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    country: string;
    city: string;
  };
  amount: number;
  currency: string;
  purpose: string;
  mtcn?: string; // Money Transfer Control Number
}

export interface TransferFees {
  transferFee: number;
  exchangeRate: number;
  totalAmount: number;
}

export type TransferStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';