import { FORM_TYPE } from '../pages/const';

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;

export interface Address {
  country: string;
  postalCode: string;
  streetName: string;
  city: string;
}
