import { FORM_TYPE } from '../pages/const';

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;

export interface Address {
  country: string;
  postalCode: string;
  streetName: string;
  city: string;
}
export interface CustomerData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Address[];
  shippingAddresses: [0];
  billingAddresses: [1];
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export interface Token {
  set: (token?: string) => Promise<void>;
  get: () => string | null;
}

export interface ProductPrice {
  centAmount: number;
  currencyCode: string;
}

export interface Product {
  masterData: {
    current: {
      name: {
        'en-US': string;
      };
      description: {
        'en-US': string;
      };
      masterVariant: {
        images: { url: string }[];
        prices: { value: ProductPrice; discounted?: { value: ProductPrice } }[];
      };
    };
  };
}

export interface CardPrice {
  regular: number | undefined;
  discounted: number | undefined;
}
