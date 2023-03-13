export interface ShoppingProducts {
  id: number;
  brandName: string;
  name: string;
  imageUrl: string;
  currentPrice: number;
  previousPrice?: number;
  amount: number;
  size: string;
  totalProduct: number;
}
