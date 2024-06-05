import { FORM_TYPE } from '../pages/const';

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;

export interface Address {
  id?: string;
  key?: string;
  state?: string;
  country: string;
  postalCode: string;
  streetName: string;
  city: string;
  // defaultShipping?: boolean;
  // defaultBilling?: boolean;
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
  set: (token: string) => void;
  get: () => string | null;
}

export interface AnonymousToken {
  set: () => Promise<void>;
  get: () => Promise<string | null>;
}

export interface CustomerIncomeData {
  id: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    anonymousId: string;
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    anonymousId: string;
    clientId: string;
    isPlatformClient: boolean;
  };
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  addresses: Address[];
  shippingAddressIds: string[];
  billingAddressIds: string[];
  isEmailVerified: boolean;
  stores: string[];
  authenticationMode: string;
  dateOfBirth: string;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}
