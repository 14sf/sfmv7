import { WalletState, WalletTransaction } from './types';
import { supabase } from "../supabase/index";
export const walletStorage = {
  async saveWalletState(userId: string, state: WalletState) {
    const { error } = await supabase
      .from('sfm_wallets')
      .upsert({
        user_id: userId,
        address: state.address,
        provider: state.provider?.id,
        chain_id: state.chainId,
        last_accessed: new Date().toISOString()
      });

    if (error) throw error;
  },

  async getWalletState(userId: string): Promise<WalletState | null> {
    const { data, error } = await supabase
      .from('sfm_wallets')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) return null;
    return data;
  },

  async saveTransaction(userId: string, transaction: WalletTransaction) {
    const { error } = await supabase
      .from('sfm_wallet_transactions')
      .insert({
        user_id: userId,
        hash: transaction.hash,
        from_address: transaction.from,
        to_address: transaction.to,
        value: transaction.value,
        status: transaction.status,
        timestamp: new Date(transaction.timestamp).toISOString()
      });

    if (error) throw error;
  },

  async getTransactions(userId: string): Promise<WalletTransaction[]> {
    const { data, error } = await supabase
      .from('sfm_wallet_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('timestamp', { ascending: false });

    if (error) throw error;
    return data || [];
  }
};