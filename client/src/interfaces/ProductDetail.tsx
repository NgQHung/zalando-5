export interface ProductDetail {
  brand?: {
    brandId?: number;
    name: string;
    description?: string;
  };
  gender?: string;
  name?: string;
  id?: number;
  info?: {
    aboutMe: string;
    careInfo: string;
  };
  media?: {
    catwalk?: string[];
    images: {
      url: string;
    }[];
  };
  isFavorite?: boolean;
  price?: {
    currency?: string;
    current: {
      value?: number;
      text: string;
    };
    previous?: { value: null | number; text: string };
  };
  size?: string;
}
