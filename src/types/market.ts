export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  sellerId: string;
  createdAt: number;
  status: 'active' | 'pending' | 'sold';
}

export type ProductCategory = 'real-estate' | 'automotive' | 'services' | 'tourism';

export interface Category {
  id: ProductCategory;
  name: string;
  description: string;
  icon: any;
  image: string;
}