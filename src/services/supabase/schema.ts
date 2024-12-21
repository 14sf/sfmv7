export interface Database {
  public: {
    Tables: {
      sfm_wallets: {
        Row: {
          id: string;
          user_id: string;
          address: string;
          created_at: string;
          last_accessed: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          address: string;
          created_at?: string;
          last_accessed?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          address?: string;
          created_at?: string;
          last_accessed?: string;
        };
      };
      sfm_wallet_transactions: {
        Row: {
          id: string;
          wallet_id: string;
          type: string;
          amount: number;
          currency: string;
          status: string;
          from_address?: string;
          to_address?: string;
          fee?: number;
          timestamp: string;
        };
        Insert: {
          id?: string;
          wallet_id: string;
          type: string;
          amount: number;
          currency: string;
          status?: string;
          from_address?: string;
          to_address?: string;
          fee?: number;
          timestamp?: string;
        };
        Update: {
          id?: string;
          wallet_id?: string;
          type?: string;
          amount?: number;
          currency?: string;
          status?: string;
          from_address?: string;
          to_address?: string;
          fee?: number;
          timestamp?: string;
        };
      };
    };
    Enums: {
      transaction_status: 'pending' | 'completed' | 'failed';
      transaction_type: 'send' | 'receive' | 'swap' | 'stake';
    };
  };
}