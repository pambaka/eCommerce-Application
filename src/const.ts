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
  profileContentWrapper: 'profile_page__content_wrapper',
  profileInfoColumn: 'profile_page__info_column',
  profileAddressColumn: 'profile_page__address_column',
  profileEditableField: 'profile_page__editable_field',
  profileInput: 'profile_page__input',
  profileAddAddressButton: 'profile_page__add_address_button',
} as const;

export const ID_NAMES = {
  defaultShipping: 'default-shipping',
  useForBilling: 'use-for-billing',
  defaultBilling: 'default-billing',
  customerName: 'customer-name',
  customerSurname: 'customer-surname',
  customerDob: 'customer-dob',
  customerEmail: 'customer-email',
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
