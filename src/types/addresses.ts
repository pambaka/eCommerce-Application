export interface BaseAddress {
  key: string;
  title: string;
  salutation: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  additionalStreetInfo?: string;
  postalCode: string;
  city: string;
  region?: string;
  state?: string;
  country: string;
  company?: string;
  department?: string;
  building?: string;
  apartment?: string;
  pOBox?: string;
  phone?: string;
  mobile?: string;
  email?: string;
  fax?: string;
  additionalAddressInfo?: string;
  externalId?: string;
}

export type AddressAction = 'addAddress' | 'changeAddress' | 'removeAddress';
