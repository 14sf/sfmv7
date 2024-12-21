export interface DodoQuoteParams {
  chainId: number;
  fromAmount: string;
  fromTokenAddress: string;
  toTokenAddress: string;
}

export interface DodoQuoteResponse {
  status: number;
  data: {
    resAmount: number;
    resPricePerToToken: number;
    resPricePerFromToken: number;
    priceImpact: number;
    useSource: string;
    targetDecimals: number;
    id: string;
  };
}

export const DODO_API_CONFIG = {
  baseUrl: 'https://api.dodoex.io',
  apiKey: import.meta.env.VITE_DODO_API_KEY,
  userAgent: 'DODO-SFM',
  rateLimit: 60, // requests per minute
  chains: {
    ETHEREUM: 1,
    OPTIMISM: 10,
    BSC: 56,
    OKC: 66,
    POLYGON: 137,
    MANTA: 169,
    CONFLUX: 1030,
    MANTLE: 5000,
    BASE: 8453,
    ARBITRUM: 42161,
    AVALANCHE: 43114,
    LINEA: 59144,
    SCROLL: 534352,
    SEPOLIA: 11155111,
    AURORA: 1313161554
  }
} as const;