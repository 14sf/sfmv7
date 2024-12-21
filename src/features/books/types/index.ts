export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  attachments?: string[];
  createdBy: string;
}

export interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'credit' | 'sfmpay';
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Book {
  id: string;
  name: string;
  type: 'personal' | 'business';
  accounts: Account[];
  categories: string[];
  createdAt: string;
  updatedAt: string;
  owner: string;
  team: TeamMember[];
}

export interface TeamMember {
  id: string;
  email: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  joinedAt: string;
}

export interface BookSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
  recentTransactions: Transaction[];
}