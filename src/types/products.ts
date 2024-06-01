import LANGUAGE from './const';

export interface ProductPrice {
  centAmount: number;
  currencyCode: string;
}

export interface MasterVariant {
  images: { url: string }[];
  prices: { value: ProductPrice; discounted?: { value: ProductPrice } }[];
}

export interface ProductData {
  name: {
    [LANGUAGE]: string;
  };
  description: {
    [LANGUAGE]: string;
  };
  masterVariant: MasterVariant;
}

export interface Product {
  key: string;
  masterData: {
    current: ProductData;
  };
}

export interface ProductProjection extends ProductData {
  key: string;
}

export interface CardPrice {
  regular: number | undefined;
  discounted: number | undefined;
}

export interface ImageURL {
  url: string;
}
