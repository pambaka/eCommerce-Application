export const CLASS_NAMES = {
  loginLogin: 'login__email',
  loginPassword: 'login__password',
  loginButton: 'login__button',
  registrationForm: 'registration__form',
  emailInput: 'registration__email',
  passwordInput: 'registration__password',
  firstName: 'registration__first-name',
  lastName: 'registration__last-name',
  birthDate: 'registration__date-of-birth',
  address: 'registration__address',
  street: 'registration__street',
  city: 'registration__city',
  postalCode: 'registration__postal-code',
  country: 'registration__country',
  registrationButton: 'registration__submit',
  shippingAddress: 'registration__shipping-address',
  productsWrapper: 'products-wrapper',
  searchInput: 'search-input',
} as const;

export const ID_NAMES = {
  defaultShipping: 'default-shipping',
  useForBilling: 'use-for-billing',
  defaultBilling: 'default-billing',
};

class Dom<T extends HTMLElement> {
  elements: { [key: string]: T };

  constructor() {
    this.elements = {};
  }

  add(key: string, value: T): void {
    this.elements[key] = value;
  }
}

export const DOM = new Dom();
