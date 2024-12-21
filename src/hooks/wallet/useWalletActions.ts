import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '../useToast';
import { WalletTransaction } from '../../types/wallet';

export const useWalletActions = (walletId: string | null) => {
  const supabase = useSupabaseClient();
  const { showToast } = useToast();

  const sendTransaction = async (
    toAddress: string,
    amount: number,
    currency: string
  ): Promise<boolean> => {
    if (!walletId) {
      showToast('No wallet connected', 'error');
      return false;
    }

    try {
      const { data: wallet } = await supabase
        .from('wallets')
        .select('address')
        .eq('id', walletId)
        .single();

      if (!wallet) throw new Error('Wallet not found');

      const transaction: Omit<WalletTransaction, 'id'> = {
        wallet_id: walletId,
        type: 'send',
        amount,
        currency,
        status: 'pending',
        from_address: wallet.address,
        to_address: toAddress,
        fee: amount * 0.002, // 0.2% fee
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('wallet_transactions')
        .insert(transaction);

      if (error) throw error;

      showToast('Transaction sent successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error sending transaction:', error);
      showToast('Failed to send transaction', 'error');
      return false;
    }
  };

  const stakeTokens = async (
    amount: number,
    currency: string
  ): Promise<boolean> => {
    if (!walletId) {
      showToast('No wallet connected', 'error');
      return false;
    }

    try {
      const transaction = {
        wallet_id: walletId,
        type: 'stake',
        amount,
        currency,
        status: 'pending',
        fee: 0,
        timestamp: new Date().toISOString()
      };

      const { error } = await supabase
        .from('wallet_transactions')
        .insert(transaction);

      if (error) throw error;

      showToast('Tokens staked successfully!', 'success');
      return true;
    } catch (error) {
      console.error('Error staking tokens:', error);
      showToast('Failed to stake tokens', 'error');
      return false;
    }
  };

  return {
    sendTransaction,
    stakeTokens
  };
};