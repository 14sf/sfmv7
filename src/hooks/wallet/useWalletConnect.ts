import { useState, useCallback } from 'react';
import { useToast } from '../useToast';
import { walletProviders } from '../../services/wallet/providers';
import { walletStorage } from '../../services/wallet/storage';
import { WalletProvider, WalletState } from '../../services/wallet/types';

export const useWalletConnect = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    provider: null,
    chainId: null,
    balance: '0'
  });
  const { showToast } = useToast();

  const connectWallet = useCallback(async (providerId: string) => {
    try {
      const provider = walletProviders.find(p => p.id === providerId);
      if (!provider) {
        throw new Error('Wallet provider not found');
      }

      if (!provider.isInstalled()) {
        showToast(`Please install ${provider.name} first`, 'error');
        return false;
      }

      const address = await provider.connect();
      const newState = {
        address,
        isConnected: true,
        provider,
        chainId: null,
        balance: '0'
      };

      setWalletState(newState);
      await walletStorage.saveWalletState('current-user', newState);
      
      showToast(`Connected to ${provider.name}`, 'success');
      return true;
    } catch (error) {
      showToast('Failed to connect wallet', 'error');
      return false;
    }
  }, [showToast]);

  const disconnectWallet = useCallback(async () => {
    try {
      setWalletState({
        address: null,
        isConnected: false,
        provider: null,
        chainId: null,
        balance: '0'
      });
      showToast('Wallet disconnected', 'success');
    } catch (error) {
      showToast('Failed to disconnect wallet', 'error');
    }
  }, [showToast]);

  return {
    walletState,
    connectWallet,
    disconnectWallet,
    availableWallets: walletProviders
  };
};