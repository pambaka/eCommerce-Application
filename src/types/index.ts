import { FORM_TYPE } from '../pages/const';

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;

export interface Address {
  id?: string;
  country: string;
  postalCode: string;
  streetName: string;
  city: string;
  state?: string;
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
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}
