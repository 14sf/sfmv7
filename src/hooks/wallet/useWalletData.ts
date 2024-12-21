import { useState, useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { WalletBalance, WalletTransaction } from '../../types/wallet';
import { useToast } from '../useToast';

export const useWalletData = (walletId: string | null) => {
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = useSupabaseClient();
  const { showToast } = useToast();

  useEffect(() => {
    if (!walletId) return;

    const fetchWalletData = async () => {
      setIsLoading(true);
      try {
        // Fetch balances
        const { data: balanceData, error: balanceError } = await supabase
          .from('wallet_balances')
          .select('*')
          .eq('wallet_id', walletId);

        if (balanceError) throw balanceError;

        // Fetch transactions
        const { data: txData, error: txError } = await supabase
          .from('wallet_transactions')
          .select('*')
          .eq('wallet_id', walletId)
          .order('timestamp', { ascending: false })
          .limit(10);

        if (txError) throw txError;

        setBalances(balanceData);
        setTransactions(txData);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        showToast('Failed to fetch wallet data', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletData();
  }, [walletId, supabase, showToast]);

  return {
    balances,
    transactions,
    isLoading
  };
};