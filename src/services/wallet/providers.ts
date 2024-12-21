import { WalletProvider } from './types';
import { Wallet } from 'lucide-react';

export const walletProviders: WalletProvider[] = [
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: 'metamask-icon',
    description: 'Connect to your MetaMask Wallet',
    isInstalled: () => typeof window !== 'undefined' && !!window.ethereum?.isMetaMask,
    connect: async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          return accounts[0];
        } catch (error) {
          throw new Error('Failed to connect to MetaMask');
        }
      }
      throw new Error('MetaMask not installed');
    }
  },
  {
    id: 'trustwallet',
    name: 'Trust Wallet',
    icon: 'trust-wallet-icon',
    description: 'Connect to your Trust Wallet',
    isInstalled: () => typeof window !== 'undefined' && !!window.ethereum?.isTrust,
    connect: async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          return accounts[0];
        } catch (error) {
          throw new Error('Failed to connect to Trust Wallet');
        }
      }
      throw new Error('Trust Wallet not installed');
    }
  },
  {
    id: 'phantom',
    name: 'Phantom',
    icon: 'phantom-icon',
    description: 'Connect to your Phantom Wallet',
    isInstalled: () => typeof window !== 'undefined' && !!window.solana?.isPhantom,
    connect: async () => {
      if (typeof window.solana !== 'undefined') {
        try {
          const resp = await window.solana.connect();
          return resp.publicKey.toString();
        } catch (error) {
          throw new Error('Failed to connect to Phantom');
        }
      }
      throw new Error('Phantom not installed');
    }
  },
  {
    id: 'brave',
    name: 'Brave Wallet',
    icon: 'brave-icon',
    description: 'Connect to Brave Wallet',
    isInstalled: () => typeof window !== 'undefined' && !!window.ethereum?.isBraveWallet,
    connect: async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          return accounts[0];
        } catch (error) {
          throw new Error('Failed to connect to Brave Wallet');
        }
      }
      throw new Error('Brave Wallet not available');
    }
  }
];