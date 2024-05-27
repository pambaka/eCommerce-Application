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
    'en-US': string;
  };
  description: {
    'en-US': string;
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