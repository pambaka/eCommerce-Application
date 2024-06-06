import { Address, CustomerIncomeData } from '../types/index';
import BaseComponent from '../components/base-component';
import ButtonComponent from '../components/button-component';
import validateStreet from '../pages/registration/logic/validate-street';
import validatePostalCode from '../pages/registration/logic/validate-postal-code';
import createSaveButton from '../pages/profile/render/create-save-button';
import createDeleteButton from '../pages/profile/render/create-delete-button';
import makeFieldEditable from '../pages/profile/render/editable-field/make-editable-field';
import CustomerUpdater from '../api/update-customer';
import showModal from '../pages/show-modal';
import createEditableField from '../pages/profile/render/editable-field/create-editable-field';
import { CLASS_NAMES } from '../const';
import handleAddressTypeAndDefaultStatus from '../pages/profile/logic/handle-address-type-and-status';
import {
  createBillingCheckbox,
  createShippingCheckbox,
  createDefaultShippingCheckbox,
  createDefaultBillingCheckbox,
} from '../pages/profile/render/create-type-status-boxes';

export default class AddressSectionComponent extends BaseComponent {
  private address: Address;

  private userInfo: CustomerIncomeData;

  private index: number;

  private saveButton: ButtonComponent;

  private deleteButton: ButtonComponent;

  private updatedAddress: Partial<Address>;

  private isNew: boolean;

  private fieldsValid: { [key: string]: boolean } = {};

  public onFieldChange: () => void;

  public onSaveButtonClick: () => void;

  public onDeleteButtonClick: () => void;

  public updateAddNewAddressButtonState: () => void;

  constructor(
    address: Address,
    index: number,
    userInfo: CustomerIncomeData,
    updateAddNewAddressButtonState: () => void,
    isNew: boolean = false,
  ) {
    super('div', 'profile_page__address_wrapper');
    this.address = address;
    this.userInfo = userInfo;
    this.index = index;
    this.isNew = isNew;
    this.updatedAddress = { ...this.address };

    this.onFieldChange = () => {};
    this.onSaveButtonClick = () => {};
    this.onDeleteButtonClick = () => {};
    this.updateAddNewAddressButtonState = updateAddNewAddressButtonState;

    this.saveButton = createSaveButton(this.handleSaveButtonClick.bind(this));
    this.deleteButton = createDeleteButton(this.handleDeleteButtonClick.bind(this));

    this.render();
  }

  private async handleSaveButtonClick() {
    if (this.areAllFieldsValid()) {
      const customerUpdater = new CustomerUpdater();
      if (this.isNew) {
        Object.assign(this.address, this.updatedAddress);
        const success = await customerUpdater.updateAddress('addAddress', undefined, this.address, this.index);
        if (success) {
          this.onSaveButtonClick();
          this.isNew = false;
          showModal('Address added successfully', '', true);

          // Call handleAddressTypeAndDefaultStatus to update the address type and default status
          await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
        } else {
          this.saveButton.node.disabled = false;
          showModal('Failed to add address', '', false);
        }
      } else {
        const addressId = await this.getAddressId(customerUpdater);
        if (addressId) {
          Object.assign(this.address, this.updatedAddress);
          const success = await customerUpdater.updateAddress('changeAddress', addressId, this.address, this.index);
          if (success) {
            this.onSaveButtonClick();
            showModal('Address updated successfully', '', true);

            // Call handleAddressTypeAndDefaultStatus to update the address type and default status
            await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
          } else {
            this.saveButton.node.disabled = false;
            showModal('Failed to update address', '', false);
          }
        } else {
          showModal('Something went wrong...', '', false);
        }
      }
    }
    this.updateAddNewAddressButtonState();
  }

  private async handleDeleteButtonClick() {
    if (this.areAllFieldsEmpty()) {
      this.node.remove();
      this.onDeleteButtonClick();
      showModal('Address removed from interface', '', true);
    } else {
      const customerUpdater = new CustomerUpdater();
      const addressId = await this.getAddressId(customerUpdater);
      if (addressId) {
        const success = await customerUpdater.updateAddress('removeAddress', addressId, undefined, this.index);
        if (success) {
          this.node.remove();
          this.onDeleteButtonClick();
          showModal('Address deleted successfully', '', true);
        } else {
          showModal('Failed to delete address', '', false);
        }
      } else {
        showModal('Something went wrong...', '', false);
      }
    }
    this.updateAddNewAddressButtonState();
  }

  private async getAddressId(customerUpdater: CustomerUpdater): Promise<string | null> {
    const customerData = await customerUpdater.fetchCustomerData();
    if (customerData && customerData.addresses) {
      const currentAddress = customerData.addresses[this.index];
      if (currentAddress && currentAddress.id) {
        return currentAddress.id;
      }
    }
    const savedAddressId = localStorage.getItem(`newAddressId-${this.index}`);
    return savedAddressId || null;
  }

  private validateFields() {
    const allValid = this.areAllFieldsValid();
    this.saveButton.node.disabled = !allValid;
    this.updateCheckboxStates();
  }

  private updateCheckboxStates() {
    const shippingCheckbox = this.node.querySelector(`#shipping-checkbox-${this.index}`) as HTMLInputElement;
    const billingCheckbox = this.node.querySelector(`#billing-checkbox-${this.index}`) as HTMLInputElement;
    const defaultShippingCheckbox = this.node.querySelector(
      `#default-shipping-checkbox-${this.index}`,
    ) as HTMLInputElement;
    const defaultBillingCheckbox = this.node.querySelector(
      `#default-billing-checkbox-${this.index}`,
    ) as HTMLInputElement;

    const allFieldsValid = this.areAllFieldsValid();

    shippingCheckbox.disabled = !allFieldsValid;
    billingCheckbox.disabled = !allFieldsValid;
    defaultShippingCheckbox.disabled = !allFieldsValid || !shippingCheckbox.checked;
    defaultBillingCheckbox.disabled = !allFieldsValid || !billingCheckbox.checked;

    if (!shippingCheckbox.checked) {
      defaultShippingCheckbox.checked = false;
    }

    if (!billingCheckbox.checked) {
      defaultBillingCheckbox.checked = false;
    }
  }

  public areAllFieldsValid(): boolean {
    return Object.values(this.fieldsValid).every(Boolean);
  }

  public areAllFieldsEmpty(): boolean {
    return !this.address.streetName && !this.address.city && !this.address.postalCode && !this.address.country;
  }

  public isSaveButtonHidden(): boolean {
    return this.saveButton.node.classList.contains('hidden');
  }

  private render() {
    const isShippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '');
    const isBillingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '');
    const isDefaultShipping = this.userInfo?.defaultShippingAddressId === this.address.id;
    const isDefaultBilling = this.userInfo?.defaultBillingAddressId === this.address.id;

    const shippingCheckbox = createShippingCheckbox(isShippingChecked, this.index, async (isChecked) => {
      if (this.isNew || !this.areAllFieldsValid()) return;
      this.updatedAddress.defaultShipping = isChecked;
      this.validateFields();
      this.onFieldChange();
      try {
        await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
      } catch (error) {
        showModal('Failed to update shipping address', 'Something went wrong...', false);
      }
    });

    const billingCheckbox = createBillingCheckbox(isBillingChecked, this.index, async (isChecked) => {
      if (this.isNew || !this.areAllFieldsValid()) return;
      this.updatedAddress.defaultBilling = isChecked;
      this.validateFields();
      this.onFieldChange();
      try {
        await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
      } catch (error) {
        showModal('Failed to update billing address', 'Something went wrong...', false);
      }
    });

    const defaultShippingCheckbox = createDefaultShippingCheckbox(isDefaultShipping, this.index, async (isChecked) => {
      if (this.isNew || !this.areAllFieldsValid()) return;
      this.updatedAddress.defaultShipping = isChecked;
      this.validateFields();
      this.onFieldChange();
      try {
        await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
      } catch (error) {
        showModal('Failed to update default shipping address', 'Something went wrong...', false);
      }
    });

    const defaultBillingCheckbox = createDefaultBillingCheckbox(isDefaultBilling, this.index, async (isChecked) => {
      if (this.isNew || !this.areAllFieldsValid()) return;
      this.updatedAddress.defaultBilling = isChecked;
      this.validateFields();
      this.onFieldChange();
      try {
        await handleAddressTypeAndDefaultStatus(this.node, this.index, this.address.id || this.address.key || '');
      } catch (error) {
        showModal('Failed to update default billing address', 'Something went wrong...', false);
      }
    });

    const checkboxContainer = new BaseComponent('div', 'address-checkbox-container');
    checkboxContainer.node.append(shippingCheckbox, billingCheckbox, defaultShippingCheckbox, defaultBillingCheckbox);
    this.node.appendChild(checkboxContainer.node);

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
        validator: (value: string) => {
          const trimmedValue = value.trim();
          return trimmedValue ? '' : 'City is required';
        },
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
      if (field.value !== undefined && field.value !== null) {
        const editableField = createEditableField(
          field.label,
          field.value,
          field.id,
          (event) => {
            const target = event.currentTarget as HTMLElement;
            makeFieldEditable(
              target.parentNode as HTMLElement,
              field.label,
              field.value,
              field.id,
              (newValue) => {
                const key = field.id.split('-')[1] as keyof Address;
                (this.updatedAddress[key] as string) = newValue;
                this.fieldsValid[field.id] = !field.validator(newValue);
                this.validateFields();
                this.onFieldChange();
              },
              CLASS_NAMES.profileEditableField,
              CLASS_NAMES.profileInput,
            );
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
        this.fieldsValid[field.id] = !field.validator(field.value);

        this.node.appendChild(editableField);
      }
    });

    const buttonWrapper = new BaseComponent('div', 'address-button-container');
    buttonWrapper.node.append(this.saveButton.node, this.deleteButton.node);

    this.node.appendChild(buttonWrapper.node);
    this.validateFields();
  }
}
