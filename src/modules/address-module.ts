import { Address, CustomerIncomeData } from '../types/index';
import BaseComponent from '../components/base-component';
import ButtonComponent from '../components/button-component';
import validateStreet from '../pages/registration/logic/validate-street';
import validatePostalCode from '../pages/registration/logic/validate-postal-code';
import createSaveButton from '../pages/profile/logic/create-save-button';
import createDeleteButton from '../pages/profile/logic/create-delete-button';
// import createDefaultStatus from '../pages/profile/logic/create-default-status';
import createEditableField from '../pages/profile/render/editable-field/create-editable-field';
import makeFieldEditable from '../pages/profile/render/editable-field/make-editable-field';
// import createAddressTitle from '../pages/profile/logic/create-address-title';
import { CLASS_NAMES } from '../const';
import CustomerUpdater from '../api/update-customer';
import showModal from '../pages/show-modal';
// import getUserInfo from '../api/get-user-info';

// export default class AddressSectionComponent extends BaseComponent {
//   private address: Address;

//   private userInfo: CustomerIncomeData;

//   private index: number;

//   private saveButton: ButtonComponent;

//   private deleteButton: ButtonComponent;

//   private updatedAddress: Partial<Address>;

//   private isNew: boolean;

//   private fieldsValid: { [key: string]: boolean } = {};

//   public onFieldChange: () => void;

//   public onSaveButtonClick: () => void;

//   public onDeleteButtonClick: () => void;

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

//     // this.saveButton = createSaveButton(async () => {
//     //   if (this.areAllFieldsValid()) {
//     //     const { parentElement } = this.saveButton.node;
//     //     if (parentElement && parentElement.parentElement) {
//     //       const parentIndex = Array.prototype.indexOf.call(parentElement.parentElement.children, parentElement);
//     //       localStorage.setItem('parentIndex', parentIndex.toString());
//     //     }

//     //     Object.assign(this.npm run build-devaddress, this.updatedAddress);
//     //     const customerUpdater = new CustomerUpdater();
//     //     const action = this.isNew ? 'addAddress' : 'changeAddress';
//     //     let addressIdOrKey = this.address.id || this.address.key || '';

//     //     if (action === 'changeAddress') {
//     //       const savedParentIndex = localStorage.getItem('parentIndex');
//     //       if (savedParentIndex && parseInt(savedParentIndex, 10) === this.index) {
//     //         addressIdOrKey = savedParentIndex;
//     //       }
//     //     }

//     //     if (addressIdOrKey) {
//     //       const success = await customerUpdater.updateAddress(action, addressIdOrKey, this.address);
//     //       if (success) {
//     //         this.onSaveButtonClick();
//     //         this.isNew = false;
//     //         showModal('Address updated successfully', '', true);
//     //       } else {
//     //         this.saveButton.node.disabled = false;
//     //         showModal('Failed to update address', '', false);
//     //       }
//     //     } else {
//     //       showModal('Something went wrong...', '', false);
//     //     }
//     //   }
//     // });

//     this.saveButton = createSaveButton(async () => {
//       if (this.areAllFieldsValid()) {
//         Object.assign(this.address, this.updatedAddress);
//         const customerUpdater = new CustomerUpdater();
//         const action = this.isNew ? 'addAddress' : 'changeAddress';
//         const addressIdOrKey = this.address.id || this.address.key || '';
//         if (addressIdOrKey) {
//           const success = this.isNew
//             ? await customerUpdater.updateAddress(action, addressIdOrKey, this.address)
//             : await customerUpdater.changeAddress(this.address);
//           if (success) {
//             this.onSaveButtonClick();
//             this.isNew = false;
//             showModal('Address updated successfully', '', true);
//           } else {
//             this.saveButton.node.disabled = false;
//             showModal('Failed to update address', '', false);
//           }
//         } else {
//           showModal('Something went wrong...', '', false);
//         }
//       }
//     });

//     this.deleteButton = createDeleteButton(async () => {
//       const customerUpdater = new CustomerUpdater();
//       const addressIdOrKey = this.address.id || this.address.key || '';
//       if (addressIdOrKey) {
//         const success = await customerUpdater.updateAddress('removeAddress', addressIdOrKey);
//         if (success) {
//           this.node.remove();
//           this.onDeleteButtonClick();
//         } else {
//           showModal('Failed to delete address', '', false);
//         }
//       } else {
//         showModal('Something went wrong...', '', false);
//       }
//     });

//     this.render();
//   }

//   private validateFields() {
//     const allValid = this.areAllFieldsValid();
//     this.saveButton.node.disabled = !allValid;
//   }

//   public areAllFieldsValid(): boolean {
//     return Object.values(this.fieldsValid).every(Boolean);
//   }

//   public isSaveButtonHidden(): boolean {
//     return this.saveButton.node.classList.contains('hidden');
//   }

//   private render() {
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
//                 this.updatedAddress[key] = newValue;
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

//     this.node.appendChild(this.saveButton.node);
//     this.node.appendChild(this.deleteButton.node);
//     this.validateFields();
//   }
// }

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

    this.saveButton = createSaveButton(async () => {
      if (this.areAllFieldsValid()) {
        const customerUpdater = new CustomerUpdater();
        const customerData = await customerUpdater.fetchCustomerData();
        if (customerData) {
          const customerAddress = customerData.addresses[this.index];
          if (customerAddress && customerAddress.id) {
            const addressId: string = customerAddress.id;
            Object.assign(this.address, this.updatedAddress);
            const action = this.isNew ? 'addAddress' : 'changeAddress';
            const success = await customerUpdater.updateAddress(action, addressId, this.address);
            if (success) {
              this.onSaveButtonClick();
              this.isNew = false;
              showModal('Address updated successfully', '', true);
            } else {
              this.saveButton.node.disabled = false;
              showModal('Failed to update address', '', false);
            }
          } else {
            showModal('Address ID not found', '', false);
          }
        } else {
          showModal('Failed to fetch customer data', '', false);
        }
      }
    });

    this.deleteButton = createDeleteButton(async () => {
      const customerUpdater = new CustomerUpdater();
      const customerData = await customerUpdater.fetchCustomerData();
      if (customerData) {
        const customerAddress = customerData.addresses[this.index];
        if (customerAddress && customerAddress.id) {
          const addressId: string = customerAddress.id;
          const success = await customerUpdater.updateAddress('removeAddress', addressId);
          if (success) {
            this.node.remove();
            this.onDeleteButtonClick();
          } else {
            showModal('Failed to delete address', '', false);
          }
        } else {
          showModal('Address ID not found', '', false);
        }
      } else {
        showModal('Failed to fetch customer data', '', false);
      }
    });

    this.render();
  }

  private validateFields() {
    const allValid = this.areAllFieldsValid();
    this.saveButton.node.disabled = !allValid;
  }

  public areAllFieldsValid(): boolean {
    return Object.values(this.fieldsValid).every(Boolean);
  }

  public isSaveButtonHidden(): boolean {
    return this.saveButton.node.classList.contains('hidden');
  }

  private render() {
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
                this.updatedAddress[key] = newValue;
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

    this.node.appendChild(this.saveButton.node);
    this.node.appendChild(this.deleteButton.node);
    this.validateFields();
  }
}
