export interface StripeConfig {
  publicKey: string;
  apiVersion: string;
  locale: string;
}

export interface StripePaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: 'requires_payment_method' | 'requires_confirmation' | 'requires_action' | 'processing' | 'succeeded' | 'canceled';
  clientSecret: string;
}

export const STRIPE_CONFIG: StripeConfig = {
  publicKey: 'pk_live_51OLSYvAodqefYIsIXqvyskauoaF8gQFHFrQvIUHsYGywUn9Xe7hu0hP4XWIv4gWL627JyAAxVumvyVmyiDVFm2Bz00yc4VgvMF',
  apiVersion: '2023-10-16',
  locale: 'en'
};