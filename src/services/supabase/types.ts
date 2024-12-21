import { Database } from './schema';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

export type WalletRecord = Tables['sfm_wallets']['Row'];
export type WalletInsert = Tables['sfm_wallets']['Insert'];
export type WalletUpdate = Tables['sfm_wallets']['Update'];

export type WalletTransactionRecord = Tables['sfm_wallet_transactions']['Row'];
export type WalletTransactionInsert = Tables['sfm_wallet_transactions']['Insert'];
export type WalletTransactionUpdate = Tables['sfm_wallet_transactions']['Update'];