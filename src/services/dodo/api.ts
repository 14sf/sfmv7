import { DodoQuoteParams, DodoQuoteResponse, DODO_API_CONFIG } from './types';

class DodoAPI {
  private baseUrl: string;
  private apiKey: string;
  private lastRequestTime: number = 0;
  private requestCount: number = 0;

  constructor() {
    this.baseUrl = DODO_API_CONFIG.baseUrl;
    this.apiKey = DODO_API_CONFIG.apiKey;
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();
    const oneMinute = 60 * 1000;

    if (now - this.lastRequestTime >= oneMinute) {
      this.requestCount = 0;
      this.lastRequestTime = now;
    } else if (this.requestCount >= DODO_API_CONFIG.rateLimit) {
      const waitTime = oneMinute - (now - this.lastRequestTime);
      await new Promise(resolve => setTimeout(resolve, waitTime));
      this.requestCount = 0;
      this.lastRequestTime = Date.now();
    }

    this.requestCount++;
  }

  public async getQuote(params: DodoQuoteParams): Promise<DodoQuoteResponse> {
    await this.checkRateLimit();

    const queryParams = new URLSearchParams({
      apikey: this.apiKey,
      chainId: params.chainId.toString(),
      fromAmount: params.fromAmount,
      fromTokenAddress: params.fromTokenAddress,
      toTokenAddress: params.toTokenAddress
    });

    const response = await fetch(
      `${this.baseUrl}/route-service/developer/quote?${queryParams}`,
      {
        headers: {
          'User-Agent': DODO_API_CONFIG.userAgent
        }
      }
    );

    if (!response.ok) {
      throw new Error(`DODO API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }
}

export const dodoAPI = new DodoAPI();