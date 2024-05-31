import { Address, CustomerIncomeData } from '../types/index';
import BaseComponent from '../components/base-component';
import ButtonComponent from '../components/button-component';
import validateStreet from '../pages/registration/logic/validate-street';
import validatePostalCode from '../pages/registration/logic/validate-postal-code';
import createSaveButton from '../pages/profile/logic/create-save-button';
import createDeleteButton from '../pages/profile/logic/create-delete-button';
import createAddressTitle from '../pages/profile/logic/create-address-title';
import createDefaultStatus from '../pages/profile/logic/create-default-status';
import createEditableField from '../pages/profile/render/editable-field/create-editable-field';
import makeFieldEditable from '../pages/profile/render/editable-field/make-editable-field';
import { CLASS_NAMES } from '../const';

export default class AddressSectionComponent extends BaseComponent {
  private address: Address;

  private userInfo: CustomerIncomeData;

  private index: number;

  private saveButton: ButtonComponent;

  private deleteButton: ButtonComponent;

  private updatedAddress: Partial<Address>;

  private isNew: boolean;

  private fieldsValid: { [key: string]: boolean } = {};

  constructor(address: Address, index: number, userInfo: CustomerIncomeData, isNew: boolean = false) {
    super('div', 'profile_page__address_wrapper');
    this.address = address;
    this.userInfo = userInfo;
    this.index = index;
    this.isNew = isNew;
    this.updatedAddress = { ...this.address };

    this.saveButton = createSaveButton(() => {
      Object.assign(this.address, this.updatedAddress);
      this.saveButton.node.classList.add('hidden');
      this.deleteButton.node.classList.remove('hidden');
    });

    this.deleteButton = createDeleteButton(() => {
      this.node.remove();
    });

    this.render();
  }

  private showSaveButton() {
    this.saveButton.node.classList.remove('hidden');
    this.deleteButton.node.classList.add('hidden');
  }

  private validateFields() {
    const allValid = Object.values(this.fieldsValid).every(Boolean);
    this.saveButton.node.disabled = !allValid;
  }

  private render() {
    let addressTitleText = this.isNew ? 'New Address' : `Address ${this.index + 1}`;

    if (this.userInfo?.shippingAddressIds.includes(this.address?.id ?? '')) {
      addressTitleText = 'Shipping Address';
    } else if (this.userInfo?.billingAddressIds.includes(this.address?.id ?? '')) {
      addressTitleText = 'Billing Address';
    }

    const addressTitleWrapper = createAddressTitle(
      addressTitleText,
      this.index,
      [
        { label: 'Shipping Address', value: 'Shipping Address' },
        { label: 'Billing Address', value: 'Billing Address' },
      ],
      (newValue) => {
        addressTitleText = newValue;
        this.showSaveButton();
      },
    );

    this.node.appendChild(addressTitleWrapper);

    const isDefaultShipping = this.userInfo?.defaultShippingAddressId === this.address.id;
    const isDefaultBilling = this.userInfo?.defaultBillingAddressId === this.address.id;
    const defaultStatus = isDefaultShipping || isDefaultBilling ? 'Default' : 'Not Default';

    const defaultStatusWrapper = createDefaultStatus(
      defaultStatus,
      this.index,
      [
        { label: 'Default', value: 'Default' },
        { label: 'Not Default', value: 'Not Default' },
      ],
      () => {
        this.showSaveButton();
      },
    );

    this.node.appendChild(defaultStatusWrapper);

    const fields = [
      {
        label: 'Street:',
        value: this.address.streetName,
        id: `address-streetName-${this.index}`,
        validator: validateStreet,
      },
      {
        label: 'City:',
        value: this.address.city,
        id: `address-city-${this.index}`,
        validator: (value: string) => (value ? '' : 'City is required'),
      },
      {
        label: 'Postal Code:',
        value: this.address.postalCode,
        id: `address-postalCode-${this.index}`,
        validator: validatePostalCode,
      },
      {
        label: 'Country:',
        value: this.address.country,
        id: `address-country-${this.index}`,
        validator: (value: string) => (value ? '' : 'Country is required'),
      },
    ];

    fields.forEach((field) => {
      const editableField = createEditableField(
        field.label,
        field.value!,
        field.id,
        (event) => {
          const target = event.currentTarget as HTMLElement;
          makeFieldEditable(
            target.parentNode as HTMLElement,
            field.label,
            field.value!,
            field.id,
            (newValue) => {
              const key = field.id.split('-')[1] as keyof Address;
              this.updatedAddress[key] = newValue;
              this.fieldsValid[field.id] = !field.validator(newValue);
              this.validateFields();
              this.showSaveButton();
            },
            CLASS_NAMES.profileEditableField,
            CLASS_NAMES.profileInput,
          );
        },
        CLASS_NAMES.profileEditableField,
        CLASS_NAMES.profileInput,
      );
      this.fieldsValid[field.id] = !field.validator(field.value!);
      this.node.appendChild(editableField);
    });

    this.node.appendChild(this.saveButton.node);
    this.node.appendChild(this.deleteButton.node);
    this.validateFields();
  }
}
