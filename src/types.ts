export const CATEGORIES = ["Makeup", "Clothing", "Accessories"] as const;
export type Category = (typeof CATEGORIES)[number];

export interface Product {
  id: number;
  image: string;
  name: string;
  category: Category;
  description: string;
  specifications: string; 
  rating: number; 
  price: number;
  quantity: number;
}


export interface CartItem {
  productId: number;
  qty: number;
}
