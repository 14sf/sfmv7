export type DocumentType = 'document' | 'image' | 'receipt';
export type TransactionType = 'addition' | 'subtraction';

export interface Document {
  type: DocumentType;
  name: string;
  url: string;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;
  timestamp: number;
  createdBy: string;
}

export interface Book {
  id: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  documents: Document[];
  transactions: Transaction[];
  team: {
    members: TeamMember[];
    invitations: TeamInvitation[];
  };
  createdBy: string;
  createdAt: number;
}