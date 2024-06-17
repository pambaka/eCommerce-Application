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
import {
  createBillingCheckbox,
  createShippingCheckbox,
  createDefaultShippingCheckbox,
  createDefaultBillingCheckbox,
} from '../pages/profile/render/create-type-status-boxes';
import showAddressModal from '../pages/profile/render/show-address-modal';
import { ActionPayload } from '../types/addresses';

// export default class AddressSectionComponent extends BaseComponent {
//   public address: Address;

//   public userInfo: CustomerIncomeData;

//   public index: number;

//   public saveButton: ButtonComponent;

//   public deleteButton: ButtonComponent;

//   public editButton: ButtonComponent;

//   public updatedAddress: Partial<Address>;

//   public isNew: boolean;

//   private fieldsValid: { [key: string]: boolean } = {};

//   public onFieldChange: () => void;

//   public onSaveButtonClick: () => void;

//   public onDeleteButtonClick: () => void;

//   private shippingChecked: boolean;

//   private billingChecked: boolean;

//   private defaultShippingChecked: boolean;

//   private defaultBillingChecked: boolean;

//   constructor(address: Address, index: number, userInfo: CustomerIncomeData, isNew: boolean = false) {
//     super('div', 'profile_page__address_wrapper');
//     this.address = address;
//     this.userInfo = userInfo;
//     this.index = index;
//     this.isNew = isNew;
//     this.updatedAddress = { ...this.address };

//     this.onFieldChange = () => {};
//     this.onSaveButtonClick = () => {};
//     this.onDeleteButtonClick = () => {};

//     this.saveButton = createSaveButton(this.handleSaveButtonClick.bind(this));
//     this.deleteButton = createDeleteButton(this.handleDeleteButtonClick.bind(this));
//     this.editButton = new ButtonComponent('edit_address__btn', this.handleEditButtonClick.bind(this), 'Edit', false);
//     this.editButton.node.classList.add('button');

//     this.shippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '') || false;
//     this.billingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '') || false;
//     this.defaultShippingChecked = this.userInfo?.defaultShippingAddressId === this.address.id;
//     this.defaultBillingChecked = this.userInfo?.defaultBillingAddressId === this.address.id;

//     this.render();
//   }

//   public handleEditButtonClick() {
//     showAddressModal(this);

//     this.node.classList.add('address-modal');
//     this.updateButtonVisibility();
//   }

//   private async handleSaveButtonClick() {
//     if (this.areAllFieldsValid()) {
//       const customerUpdater = new CustomerUpdater();
//       if (this.isNew) {
//         Object.assign(this.address, this.updatedAddress);
//         const success = await customerUpdater.updateAddress('addAddress', undefined, this.address, this.index);
//         if (success) {
//           this.onSaveButtonClick();
//           this.isNew = false;

//           await this.updateAddressTypeAndDefaultStatus();
//           this.updateCheckboxStates();
//         } else {
//           this.saveButton.node.disabled = false;
//           showModal('Failed to add address', '', false);
//         }
//       } else {
//         const addressId = await this.getAddressId(customerUpdater);
//         if (addressId) {
//           Object.assign(this.address, this.updatedAddress);
//           const success = await customerUpdater.updateAddress('changeAddress', addressId, this.address, this.index);
//           if (success) {
//             this.onSaveButtonClick();

//             await this.updateAddressTypeAndDefaultStatus();
//             this.updateCheckboxStates();
//           } else {
//             this.saveButton.node.disabled = false;
//             showModal('Failed to update address', '', false);
//           }
//         } else {
//           showModal('Something went wrong...', '', false);
//         }
//       }
//     }
//     this.closeModal();
//   }

//   private async updateAddressTypeAndDefaultStatus() {
//     const customerUpdater = new CustomerUpdater();
//     const customerData = await customerUpdater.fetchCustomerData();

//     if (!customerData) {
//       showModal('Failed to fetch customer data', 'Something went wrong...', false);
//       return;
//     }

//     const actions: ActionPayload[] = [];

//     if (this.shippingChecked) {
//       actions.push({ action: 'addShippingAddressId', addressId: this.address.id || this.address.key! });
//     } else if (customerData.shippingAddressIds.includes(this.address.id || this.address.key!)) {
//       actions.push({ action: 'removeShippingAddressId', addressId: this.address.id || this.address.key! });
//       if (customerData.defaultShippingAddressId === (this.address.id || this.address.key!)) {
//         actions.push({ action: 'setDefaultShippingAddress', addressId: null });
//         this.defaultShippingChecked = false;
//       }
//     }

//     if (this.billingChecked) {
//       actions.push({ action: 'addBillingAddressId', addressId: this.address.id || this.address.key! });
//     } else if (customerData.billingAddressIds.includes(this.address.id || this.address.key!)) {
//       actions.push({ action: 'removeBillingAddressId', addressId: this.address.id || this.address.key! });
//       if (customerData.defaultBillingAddressId === (this.address.id || this.address.key!)) {
//         actions.push({ action: 'setDefaultBillingAddress', addressId: null });
//         this.defaultBillingChecked = false;
//       }
//     }

//     if (
//       (this.defaultShippingChecked && customerData.defaultShippingAddressId !== this.address.id) ||
//       this.address.key
//     ) {
//       actions.push({ action: 'setDefaultShippingAddress', addressId: this.address.id || this.address.key! });
//     } else if (
//       (!this.defaultShippingChecked && customerData.defaultShippingAddressId === this.address.id) ||
//       this.address.key
//     ) {
//       actions.push({ action: 'setDefaultShippingAddress', addressId: null });
//     }

//     if ((this.defaultBillingChecked && customerData.defaultBillingAddressId !== this.address.id) || this.address.key) {
//       actions.push({ action: 'setDefaultBillingAddress', addressId: this.address.id || this.address.key! });
//     } else if (
//       (!this.defaultBillingChecked && customerData.defaultBillingAddressId === this.address.id) ||
//       this.address.key
//     ) {
//       actions.push({ action: 'setDefaultBillingAddress', addressId: null });
//     }

//     if (actions.length === 0) return;

//     const requestBody = {
//       version: customerData.version,
//       actions,
//     };

//     const success = await customerUpdater.fetchUpdate(requestBody);

//     if (success) {
//       showModal('Address updated successfully', '', true);
//     } else {
//       showModal('Failed to update address', 'Something went wrong...', false);
//     }
//   }

//   private async handleDeleteButtonClick() {
//     if (this.areAllFieldsEmpty()) {
//       this.node.remove();
//       this.onDeleteButtonClick();
//       showModal('Address removed from interface', '', true);
//     } else {
//       const customerUpdater = new CustomerUpdater();
//       const addressId = await this.getAddressId(customerUpdater);
//       if (addressId) {
//         const success = await customerUpdater.updateAddress('removeAddress', addressId, undefined, this.index);
//         if (success) {
//           this.node.remove();
//           this.onDeleteButtonClick();
//           showModal('Address deleted successfully', '', true);
//         } else {
//           showModal('Failed to delete address', '', false);
//         }
//       } else {
//         showModal('Something went wrong...', '', false);
//       }
//     }
//   }

//   private async getAddressId(customerUpdater: CustomerUpdater): Promise<string | null> {
//     const customerData = await customerUpdater.fetchCustomerData();
//     if (customerData && customerData.addresses) {
//       const currentAddress = customerData.addresses[this.index];
//       if (currentAddress && currentAddress.id) {
//         return currentAddress.id;
//       }
//     }
//     const savedAddressId = localStorage.getItem(`newAddressId-${this.index}`);
//     return savedAddressId || null;
//   }

//   private validateFields() {
//     const allValid = this.areAllFieldsValid();
//     this.saveButton.node.disabled = !allValid;
//     this.updateCheckboxStates();
//   }

//   private updateCheckboxStates() {
//     const shippingCheckbox = this.node.querySelector(`#shipping-checkbox-${this.index}`) as HTMLInputElement;
//     const billingCheckbox = this.node.querySelector(`#billing-checkbox-${this.index}`) as HTMLInputElement;
//     const defaultShippingCheckbox = this.node.querySelector(
//       `#default-shipping-checkbox-${this.index}`,
//     ) as HTMLInputElement;
//     const defaultBillingCheckbox = this.node.querySelector(
//       `#default-billing-checkbox-${this.index}`,
//     ) as HTMLInputElement;

//     const allFieldsValid = this.areAllFieldsValid();

//     shippingCheckbox.disabled = !allFieldsValid;
//     billingCheckbox.disabled = !allFieldsValid;
//     defaultShippingCheckbox.disabled = !allFieldsValid || !shippingCheckbox.checked;
//     defaultBillingCheckbox.disabled = !allFieldsValid || !billingCheckbox.checked;

//     shippingCheckbox.checked = this.shippingChecked;
//     billingCheckbox.checked = this.billingChecked;
//     defaultShippingCheckbox.checked = this.defaultShippingChecked;
//     defaultBillingCheckbox.checked = this.defaultBillingChecked;

//     if (!shippingCheckbox.checked) {
//       defaultShippingCheckbox.checked = false;
//     }

//     if (!billingCheckbox.checked) {
//       defaultBillingCheckbox.checked = false;
//     }
//   }

//   public areAllFieldsValid(): boolean {
//     return Object.values(this.fieldsValid).every(Boolean);
//   }

//   public areAllFieldsEmpty(): boolean {
//     return !this.address.streetName && !this.address.city && !this.address.postalCode && !this.address.country;
//   }

//   public isSaveButtonHidden(): boolean {
//     return this.saveButton.node.classList.contains('hidden');
//   }

//   public updateButtonVisibility() {
//     const isModal = this.node.classList.contains('address-modal');
//     const editButtons = this.node.querySelectorAll('.edit-button') as NodeListOf<HTMLElement>;
//     const checkboxes = this.node.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

//     if (isModal) {
//       this.editButton.node.classList.add('hidden');
//       this.saveButton.node.classList.remove('hidden');
//       this.deleteButton.node.classList.add('hidden');
//       editButtons.forEach((button) => button.classList.remove('hidden'));
//       checkboxes.forEach((checkbox) => {
//         const cb = checkbox;
//         cb.disabled = false;
//       });
//     } else {
//       this.editButton.node.classList.remove('hidden');
//       this.saveButton.node.classList.add('hidden');
//       this.deleteButton.node.classList.remove('hidden');
//       editButtons.forEach((button) => button.classList.add('hidden'));
//       checkboxes.forEach((checkbox) => {
//         const cb = checkbox;
//         cb.disabled = true;
//       });
//     }
//   }

//   public closeModal() {
//     this.node.classList.remove('address-modal');
//     this.updateButtonVisibility();

//     if (this.isNew) {
//       this.node.remove();
//       this.onDeleteButtonClick();
//     } else {
//       this.updatedAddress = { ...this.address };
//       this.render();
//     }
//   }

//   // public closeModal() {
//   //   this.node.classList.remove('address-modal');
//   //   this.updateButtonVisibility();

//   //   if (this.isNew && !this.address.id) {
//   //     this.node.remove();
//   //     this.onDeleteButtonClick();
//   //   } else {
//   //     this.updatedAddress = { ...this.address };
//   //     this.render();
//   //   }
//   // }

//   // public render() {
//   //   this.node.innerHTML = '';

//   //   const isShippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '');
//   //   const isBillingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '');
//   //   const isDefaultShipping = this.userInfo?.defaultShippingAddressId === this.address.id;
//   //   const isDefaultBilling = this.userInfo?.defaultBillingAddressId === this.address.id;

//   //   const shippingCheckbox = createShippingCheckbox(isShippingChecked, this.index, (isChecked) => {
//   //     this.shippingChecked = isChecked;
//   //     this.validateFields();
//   //     this.onFieldChange();
//   //   });

//   //   const billingCheckbox = createBillingCheckbox(isBillingChecked, this.index, (isChecked) => {
//   //     this.billingChecked = isChecked;
//   //     this.validateFields();
//   //     this.onFieldChange();
//   //   });

//   //   const defaultShippingCheckbox = createDefaultShippingCheckbox(isDefaultShipping, this.index, (isChecked) => {
//   //     this.defaultShippingChecked = isChecked;
//   //     this.validateFields();
//   //     this.onFieldChange();
//   //   });

//   //   const defaultBillingCheckbox = createDefaultBillingCheckbox(isDefaultBilling, this.index, (isChecked) => {
//   //     this.defaultBillingChecked = isChecked;
//   //     this.validateFields();
//   //     this.onFieldChange();
//   //   });

//   //   const checkboxContainer = new BaseComponent('div', 'address-checkbox-container');
//   //   checkboxContainer.node.append(shippingCheckbox, billingCheckbox, defaultShippingCheckbox, defaultBillingCheckbox);
//   //   this.node.appendChild(checkboxContainer.node);

//   //   const fields = [
//   //     {
//   //       label: 'Street:',
//   //       value: this.address.streetName,
//   //       id: `address-streetName-${this.index}`,
//   //       validator: validateStreet,
//   //     },
//   //     {
//   //       label: 'City:',
//   //       value: this.address.city,
//   //       id: `address-city-${this.index}`,
//   //       validator: (value: string) => {
//   //         const trimmedValue = value.trim();
//   //         return trimmedValue ? '' : 'City is required';
//   //       },
//   //     },
//   //     {
//   //       label: 'Postal Code:',
//   //       value: this.address.postalCode,
//   //       id: `address-postalCode-${this.index}`,
//   //       validator: validatePostalCode,
//   //     },
//   //     {
//   //       label: 'Country:',
//   //       value: this.address.country,
//   //       id: `address-country-${this.index}`,
//   //       validator: (value: string) => (value ? '' : 'Country is required'),
//   //     },
//   //   ];

//   //   fields.forEach((field) => {
//   //     if (field.value !== undefined && field.value !== null) {
//   //       const editableField = createEditableField(
//   //         field.label,
//   //         field.value,
//   //         field.id,
//   //         (event) => {
//   //           const target = event.currentTarget as HTMLElement;
//   //           makeFieldEditable(
//   //             target.parentNode as HTMLElement,
//   //             field.label,
//   //             field.value,
//   //             field.id,
//   //             (newValue) => {
//   //               const key = field.id.split('-')[1] as keyof Address;
//   //               (this.updatedAddress[key] as string) = newValue;
//   //               this.fieldsValid[field.id] = !field.validator(newValue);
//   //               this.validateFields();
//   //               this.onFieldChange();
//   //             },
//   //             CLASS_NAMES.profileEditableField,
//   //             CLASS_NAMES.profileInput,
//   //           );
//   //         },
//   //         CLASS_NAMES.profileEditableField,
//   //         CLASS_NAMES.profileInput,
//   //       );
//   //       this.fieldsValid[field.id] = !field.validator(field.value);

//   //       this.node.appendChild(editableField);
//   //     }
//   //   });

//   //   const buttonWrapper = new BaseComponent('div', 'address-button-container');
//   //   buttonWrapper.node.append(this.editButton.node, this.saveButton.node, this.deleteButton.node);

//   //   this.node.appendChild(buttonWrapper.node);
//   //   this.validateFields();

//   //   this.updateButtonVisibility();
//   // }

//   public render() {
//     this.node.innerHTML = '';

//     const isShippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '');
//     const isBillingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '');
//     const isDefaultShipping = this.userInfo?.defaultShippingAddressId === this.address.id;
//     const isDefaultBilling = this.userInfo?.defaultBillingAddressId === this.address.id;

//     const shippingCheckbox = createShippingCheckbox(isShippingChecked, this.index, (isChecked) => {
//       this.shippingChecked = isChecked;
//       this.validateFields();
//       this.onFieldChange();
//     });

//     const billingCheckbox = createBillingCheckbox(isBillingChecked, this.index, (isChecked) => {
//       this.billingChecked = isChecked;
//       this.validateFields();
//       this.onFieldChange();
//     });

//     const defaultShippingCheckbox = createDefaultShippingCheckbox(isDefaultShipping, this.index, (isChecked) => {
//       this.defaultShippingChecked = isChecked;
//       this.validateFields();
//       this.onFieldChange();
//     });

//     const defaultBillingCheckbox = createDefaultBillingCheckbox(isDefaultBilling, this.index, (isChecked) => {
//       this.defaultBillingChecked = isChecked;
//       this.validateFields();
//       this.onFieldChange();
//     });

//     const checkboxContainer = new BaseComponent('div', 'address-checkbox-container');
//     checkboxContainer.node.append(shippingCheckbox, billingCheckbox, defaultShippingCheckbox, defaultBillingCheckbox);
//     this.node.appendChild(checkboxContainer.node);

//     const fields = [
//       {
//         label: 'Street:',
//         value: this.address.streetName,
//         id: `address-streetName-${this.index}`,
//         validator: validateStreet,
//       },
//       {
//         label: 'City:',
//         value: this.address.city,
//         id: `address-city-${this.index}`,
//         validator: (value: string) => {
//           const trimmedValue = value.trim();
//           return trimmedValue ? '' : 'City is required';
//         },
//       },
//       {
//         label: 'Postal Code:',
//         value: this.address.postalCode,
//         id: `address-postalCode-${this.index}`,
//         validator: validatePostalCode,
//       },
//       {
//         label: 'Country:',
//         value: this.address.country,
//         id: `address-country-${this.index}`,
//         validator: (value: string) => (value ? '' : 'Country is required'),
//       },
//     ];

//     fields.forEach((field) => {
//       if (field.value !== undefined && field.value !== null) {
//         const editableField = createEditableField(
//           field.label,
//           field.value,
//           field.id,
//           (event) => {
//             const target = event.currentTarget as HTMLElement;
//             makeFieldEditable(
//               target.parentNode as HTMLElement,
//               field.label,
//               field.value,
//               field.id,
//               (newValue) => {
//                 const key = field.id.split('-')[1] as keyof Address;
//                 (this.updatedAddress[key] as string) = newValue;
//                 this.fieldsValid[field.id] = !field.validator(newValue);
//                 this.validateFields();
//                 this.onFieldChange();
//               },
//               CLASS_NAMES.profileEditableField,
//               CLASS_NAMES.profileInput,
//             );
//           },
//           CLASS_NAMES.profileEditableField,
//           CLASS_NAMES.profileInput,
//         );
//         this.fieldsValid[field.id] = !field.validator(field.value);

//         this.node.appendChild(editableField);
//       }
//     });

//     const buttonWrapper = new BaseComponent('div', 'address-button-container');
//     buttonWrapper.node.append(this.editButton.node, this.saveButton.node, this.deleteButton.node);

//     this.node.appendChild(buttonWrapper.node);
//     this.validateFields();

//     this.updateButtonVisibility();
//   }
// }

export default class AddressSectionComponent extends BaseComponent {
  public address: Address;

  public userInfo: CustomerIncomeData;

  public index: number;

  public saveButton: ButtonComponent;

  public deleteButton: ButtonComponent;

  public editButton: ButtonComponent;

  public updatedAddress: Partial<Address>;

  public isNew: boolean;

  private fieldsValid: { [key: string]: boolean } = {};

  public onFieldChange: () => void;

  public onSaveButtonClick: () => void;

  public onDeleteButtonClick: () => void;

  private shippingChecked: boolean;

  private billingChecked: boolean;

  private defaultShippingChecked: boolean;

  private defaultBillingChecked: boolean;

  constructor(address: Address, index: number, userInfo: CustomerIncomeData, isNew: boolean = false) {
    super('div', 'profile_page__address_wrapper');
    this.address = address;
    this.userInfo = userInfo;
    this.index = index;
    this.isNew = isNew;
    this.updatedAddress = { ...this.address };

    this.onFieldChange = () => {};
    this.onSaveButtonClick = () => {};
    this.onDeleteButtonClick = () => {};

    this.saveButton = createSaveButton(this.handleSaveButtonClick.bind(this));
    this.deleteButton = createDeleteButton(this.handleDeleteButtonClick.bind(this));
    this.editButton = new ButtonComponent('edit_address__btn', this.handleEditButtonClick.bind(this), 'Edit', false);
    this.editButton.node.classList.add('button');

    this.shippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '') || false;
    this.billingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '') || false;
    this.defaultShippingChecked = this.userInfo?.defaultShippingAddressId === this.address.id;
    this.defaultBillingChecked = this.userInfo?.defaultBillingAddressId === this.address.id;

    this.render();
  }

  public handleEditButtonClick() {
    showAddressModal(this);
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

          await this.updateAddressTypeAndDefaultStatus();
          this.updateCheckboxStates();
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

            await this.updateAddressTypeAndDefaultStatus();
            this.updateCheckboxStates();
          } else {
            this.saveButton.node.disabled = false;
            showModal('Failed to update address', '', false);
          }
        } else {
          showModal('Something went wrong...', '', false);
        }
      }
    }
    this.closeModal();
  }

  private async updateAddressTypeAndDefaultStatus() {
    const customerUpdater = new CustomerUpdater();
    const customerData = await customerUpdater.fetchCustomerData();

    if (!customerData) {
      showModal('Failed to fetch customer data', 'Something went wrong...', false);
      return;
    }

    const actions: ActionPayload[] = [];

    if (this.shippingChecked) {
      actions.push({ action: 'addShippingAddressId', addressId: this.address.id || this.address.key! });
    } else if (customerData.shippingAddressIds.includes(this.address.id || this.address.key!)) {
      actions.push({ action: 'removeShippingAddressId', addressId: this.address.id || this.address.key! });
      if (customerData.defaultShippingAddressId === (this.address.id || this.address.key!)) {
        actions.push({ action: 'setDefaultShippingAddress', addressId: null });
        this.defaultShippingChecked = false;
      }
    }

    if (this.billingChecked) {
      actions.push({ action: 'addBillingAddressId', addressId: this.address.id || this.address.key! });
    } else if (customerData.billingAddressIds.includes(this.address.id || this.address.key!)) {
      actions.push({ action: 'removeBillingAddressId', addressId: this.address.id || this.address.key! });
      if (customerData.defaultBillingAddressId === (this.address.id || this.address.key!)) {
        actions.push({ action: 'setDefaultBillingAddress', addressId: null });
        this.defaultBillingChecked = false;
      }
    }

    if (
      (this.defaultShippingChecked && customerData.defaultShippingAddressId !== this.address.id) ||
      this.address.key
    ) {
      actions.push({ action: 'setDefaultShippingAddress', addressId: this.address.id || this.address.key! });
    } else if (
      (!this.defaultShippingChecked && customerData.defaultShippingAddressId === this.address.id) ||
      this.address.key
    ) {
      actions.push({ action: 'setDefaultShippingAddress', addressId: null });
    }

    if ((this.defaultBillingChecked && customerData.defaultBillingAddressId !== this.address.id) || this.address.key) {
      actions.push({ action: 'setDefaultBillingAddress', addressId: this.address.id || this.address.key! });
    } else if (
      (!this.defaultBillingChecked && customerData.defaultBillingAddressId === this.address.id) ||
      this.address.key
    ) {
      actions.push({ action: 'setDefaultBillingAddress', addressId: null });
    }

    if (actions.length === 0) return;

    const requestBody = {
      version: customerData.version,
      actions,
    };

    const success = await customerUpdater.fetchUpdate(requestBody);

    if (success) {
      showModal('Address updated successfully', '', true);
    } else {
      showModal('Failed to update address', 'Something went wrong...', false);
    }
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

    shippingCheckbox.checked = this.shippingChecked;
    billingCheckbox.checked = this.billingChecked;
    defaultShippingCheckbox.checked = this.defaultShippingChecked;
    defaultBillingCheckbox.checked = this.defaultBillingChecked;

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

  public updateButtonVisibility() {
    const isModal = this.node.classList.contains('address-modal');
    const editButtons = this.node.querySelectorAll('.edit-button') as NodeListOf<HTMLElement>;
    const checkboxes = this.node.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;

    if (isModal) {
      this.editButton.node.classList.add('hidden');
      this.saveButton.node.classList.remove('hidden');
      this.deleteButton.node.classList.add('hidden');
      editButtons.forEach((button) => button.classList.remove('hidden'));
      checkboxes.forEach((checkbox) => {
        const cb = checkbox;
        cb.disabled = false;
      });
    } else {
      this.editButton.node.classList.remove('hidden');
      this.saveButton.node.classList.add('hidden');
      this.deleteButton.node.classList.remove('hidden');
      editButtons.forEach((button) => button.classList.add('hidden'));
      checkboxes.forEach((checkbox) => {
        const cb = checkbox;
        cb.disabled = true;
      });
    }
  }

  public closeModal() {
    this.node.classList.remove('address-modal');
    this.updateButtonVisibility();

    if (this.isNew) {
      this.node.remove();
      this.onDeleteButtonClick();
    } else {
      this.updatedAddress = { ...this.address };
      this.render();
    }
  }

  public render() {
    this.node.innerHTML = '';

    const isShippingChecked = this.userInfo?.shippingAddressIds?.includes(this.address?.id ?? '');
    const isBillingChecked = this.userInfo?.billingAddressIds?.includes(this.address?.id ?? '');
    const isDefaultShipping = this.userInfo?.defaultShippingAddressId === this.address.id;
    const isDefaultBilling = this.userInfo?.defaultBillingAddressId === this.address.id;

    const shippingCheckbox = createShippingCheckbox(isShippingChecked, this.index, (isChecked) => {
      this.shippingChecked = isChecked;
      this.validateFields();
      this.onFieldChange();
    });

    const billingCheckbox = createBillingCheckbox(isBillingChecked, this.index, (isChecked) => {
      this.billingChecked = isChecked;
      this.validateFields();
      this.onFieldChange();
    });

    const defaultShippingCheckbox = createDefaultShippingCheckbox(isDefaultShipping, this.index, (isChecked) => {
      this.defaultShippingChecked = isChecked;
      this.validateFields();
      this.onFieldChange();
    });

    const defaultBillingCheckbox = createDefaultBillingCheckbox(isDefaultBilling, this.index, (isChecked) => {
      this.defaultBillingChecked = isChecked;
      this.validateFields();
      this.onFieldChange();
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
    buttonWrapper.node.append(this.editButton.node, this.saveButton.node, this.deleteButton.node);

    this.node.appendChild(buttonWrapper.node);
    this.validateFields();

    this.updateButtonVisibility();
  }
}
