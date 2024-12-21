import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useToast } from '../useToast';
import { WalletBalance, WalletTransaction } from '../../types/wallet';

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [address, setAddress] = useState<string | null>(null);
  const [balances, setBalances] = useState<WalletBalance[]>([]);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const supabase = useSupabaseClient();
  const { showToast } = useToast();

  useEffect(() => {
    checkConnection();
  }, []);

  const unlockWallet = async (password: string): Promise<boolean> => {
    try {
      // In a real app, this would decrypt the wallet
      setIsLocked(false);
      showToast('Wallet unlocked successfully!', 'success');
      return true;
    } catch (error) {
      showToast('Failed to unlock wallet', 'error');
      return false;
    }
  };

  const lockWallet = () => {
    setIsLocked(true);
    showToast('Wallet locked successfully!', 'success');
  };

  const checkConnection = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        
        if (accounts.length > 0) {
          setIsConnected(true);
          setAddress(accounts[0].address);
          await fetchBalances(accounts[0].address);
        }
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  const connect = async () => {
    try {
      if (!window.ethereum) {
        showToast('Please install MetaMask', 'error');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      
      if (accounts.length > 0) {
        setIsConnected(true);
        setAddress(accounts[0]);
        await fetchBalances(accounts[0]);
        showToast('Wallet connected successfully!', 'success');
      }
    } catch (error) {
      showToast('Failed to connect wallet', 'error');
    }
  };

  const fetchBalances = async (address: string) => {
    try {
      // In a real app, this would fetch real balances
      const mockBalances: WalletBalance[] = [
        {
          currency: 'SFM',
          amount: 1234.56,
          value: 1523.45,
          change24h: 5.2
        }
      ];
      setBalances(mockBalances);
    } catch (error) {
      showToast('Failed to fetch balances', 'error');
    }
  };

  const sendTransaction = async (to: string, amount: number) => {
    try {
      // In a real app, this would send a real transaction
      const mockTx: WalletTransaction = {
        id: Date.now().toString(),
        type: 'send',
        amount,
        currency: 'SFM',
        timestamp: Date.now(),
        status: 'completed',
        to,
        fee: 0.001
      };
      setTransactions([mockTx, ...transactions]);
      showToast('Transaction sent successfully!', 'success');
    } catch (error) {
      showToast('Failed to send transaction', 'error');
    }
  };

  return {
    isConnected,
    isLocked,
    address,
    balances,
    transactions,
    connect,
    sendTransaction,
    unlockWallet,
    lockWallet
  };
};