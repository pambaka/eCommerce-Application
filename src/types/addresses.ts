import { Address } from './index';

export default interface BaseAddress {
  id?: string;
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

export interface CustomerData {
  id: string;
  version: number;
  addresses: Address[];
}

export interface FetchUpdateResponse {
  statusCode: number;
  message: string;
  addresses?: Address[];
  errors?: Array<{
    code: string;
    message: string;
    action: object;
    actionIndex: number;
  }>;
}
