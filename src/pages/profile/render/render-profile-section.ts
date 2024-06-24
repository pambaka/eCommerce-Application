import BaseComponent from '../../../components/base-component';
import AddressSectionComponent from '../../../modules/address-module';
import { CustomerIncomeData, Address } from '../../../types/index';
import createEditableFieldWithHandler from './editable-field/create-editable-field-with-handler';
import ButtonComponent from '../../../components/button-component';
import { CLASS_NAMES, ID_NAMES } from '../../../const';
import showModal from '../../show-modal';

export default class RenderProfileSectionContent {
  private contentWrapper: BaseComponent;

  private infoColumn: BaseComponent;

  private addressColumn: BaseComponent;

  private updatedUserInfo: CustomerIncomeData;

  private addressSections: AddressSectionComponent[] = [];

  private addNewAddressButton!: ButtonComponent;

  constructor(userInfo: CustomerIncomeData, parentNode: HTMLElement) {
    this.contentWrapper = new BaseComponent('div', CLASS_NAMES.profileContentWrapper);
    parentNode.appendChild(this.contentWrapper.node);

    this.infoColumn = new BaseComponent('div', CLASS_NAMES.profileInfoColumn);
    this.addressColumn = new BaseComponent('div', CLASS_NAMES.profileAddressColumn);
    this.updatedUserInfo = { ...userInfo };

    this.createInfoFields(userInfo);
    this.createAddressFields(userInfo);

    this.contentWrapper.node.append(this.infoColumn.node, this.addressColumn.node, this.addNewAddressButton.node);
  }

  private createInfoFields(userInfo: CustomerIncomeData) {
    const firstNameField = createEditableFieldWithHandler(
      'First name:',
      userInfo.firstName,
      ID_NAMES.customerName,
      (newValue) => {
        this.updatedUserInfo.firstName = newValue;
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );

    const lastNameField = createEditableFieldWithHandler(
      'Last name:',
      userInfo.lastName,
      ID_NAMES.customerSurname,
      (newValue) => {
        this.updatedUserInfo.lastName = newValue;
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );

    const dobField = createEditableFieldWithHandler(
      'Date of Birth:',
      userInfo.dateOfBirth,
      ID_NAMES.customerDob,
      (newValue) => {
        this.updatedUserInfo.dateOfBirth = newValue;
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );

    const emailField = createEditableFieldWithHandler(
      'Email:',
      userInfo.email,
      ID_NAMES.customerEmail,
      (newValue) => {
        this.updatedUserInfo.email = newValue;
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );

    const passwordField = createEditableFieldWithHandler(
      'Edit password',
      '',
      ID_NAMES.customerPassword,
      () => {},
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    );

    this.infoColumn.node.append(firstNameField, lastNameField, dobField, emailField, passwordField);
  }

  private createAddressFields(userInfo: CustomerIncomeData) {
    this.addNewAddressButton = new ButtonComponent(
      'button',
      (event) => {
        event.stopPropagation();
        const newAddress: Address = {
          id: `new-${Date.now()}`,
          streetName: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        };
        this.updatedUserInfo.addresses.push(newAddress);
        const newAddressSection = new AddressSectionComponent(
          newAddress,
          this.updatedUserInfo.addresses.length - 1,
          this.updatedUserInfo,
          true,
        );
        this.addressSections.push(newAddressSection);
        this.addressColumn.node.appendChild(newAddressSection.node);

        newAddressSection.handleEditButtonClick();
      },
      'Add new address',
      false,
    );

    this.addNewAddressButton.node.classList.add(CLASS_NAMES.profileAddAddressButton);

    userInfo.addresses.forEach((address, index) => {
      const addressSection = new AddressSectionComponent(address, index, this.updatedUserInfo);
      this.addressSections.push(addressSection);
      this.addressColumn.node.appendChild(addressSection.node);
    });

    this.addressSections.forEach((section) => {
      const addressSection = section;
      addressSection.onFieldChange = () => {};
      addressSection.onSaveButtonClick = () => {};
    });
  }

  public showInfo() {
    this.infoColumn.node.style.display = 'grid';
    this.addressColumn.node.style.display = 'none';
    this.addNewAddressButton.node.style.display = 'none';
  }

  public showAddresses() {
    this.infoColumn.node.style.display = 'none';
    this.addressColumn.node.style.display = 'grid';
    this.addNewAddressButton.node.style.display = 'grid';
  }

  public static renderError(message: string) {
    showModal('Error', message, false);
  }
}
