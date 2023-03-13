export interface Products {
  id: number;
  name: string;
  brandName: string;
  colour: string;
  imageUrl: string;
  isFavorite: boolean;
  isSellingFast?: boolean;
  price: {
    currency: string;
    current: {
      value: number;
      text: string;
    };
    previous: { value: null | number; text: string };
  };
  productCode?: number;
  productType: string;
  url?: string;
  amount?: number;
  size?: string;
  totalProduct?: number;
}
