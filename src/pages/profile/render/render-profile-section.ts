import BaseComponent from '../../../components/base-component';
import createAddressProfileSection from '../../../modules/address-profile-section/create-adress-profile-section';
import { CustomerIncomeData } from '../../../types/index';
import createEditableField from '../../../modules/editable-field/create-editable-field';
import makeFieldEditable from '../../../modules/editable-field/make-editable-field';
import ButtonComponent from '../../../components/button-component';
import { CLASS_NAMES, ID_NAMES } from '../../../const';

export default function renderProfileSectionContent(userInfo: CustomerIncomeData, parentNode: HTMLElement) {
  const contentWrapper = new BaseComponent('div', CLASS_NAMES.profileContentWrapper);
  parentNode.appendChild(contentWrapper.node);

  const infoColumn = new BaseComponent('div', CLASS_NAMES.profileInfoColumn);
  const addressColumn = new BaseComponent('div', CLASS_NAMES.profileAddressColumn);

  const updatedUserInfo = { ...userInfo };

  infoColumn.node.append(
    createEditableField(
      'First name:',
      userInfo.firstName,
      ID_NAMES.customerName,
      (event) => {
        const target = event.currentTarget as HTMLElement;
        makeFieldEditable(
          target.parentNode as HTMLElement,
          'First name:',
          userInfo.firstName,
          ID_NAMES.customerName,
          (newValue) => {
            updatedUserInfo.firstName = newValue;
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    ),
    createEditableField(
      'Last name:',
      userInfo.lastName,
      ID_NAMES.customerSurname,
      (event) => {
        const target = event.currentTarget as HTMLElement;
        makeFieldEditable(
          target.parentNode as HTMLElement,
          'Last name:',
          userInfo.lastName,
          ID_NAMES.customerSurname,
          (newValue) => {
            updatedUserInfo.lastName = newValue;
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    ),
    createEditableField(
      'Date of Birth:',
      userInfo.dateOfBirth,
      ID_NAMES.customerDob,
      (event) => {
        const target = event.currentTarget as HTMLElement;
        makeFieldEditable(
          target.parentNode as HTMLElement,
          'Date of Birth:',
          userInfo.dateOfBirth,
          ID_NAMES.customerDob,
          (newValue) => {
            updatedUserInfo.dateOfBirth = newValue;
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    ),
    createEditableField(
      'Email:',
      userInfo.email,
      ID_NAMES.customerEmail,
      (event) => {
        const target = event.currentTarget as HTMLElement;
        makeFieldEditable(
          target.parentNode as HTMLElement,
          'Email:',
          userInfo.email,
          ID_NAMES.customerEmail,
          (newValue) => {
            updatedUserInfo.email = newValue;
          },
          CLASS_NAMES.profileEditableField,
          CLASS_NAMES.profileInput,
        );
      },
      CLASS_NAMES.profileEditableField,
      CLASS_NAMES.profileInput,
    ),
  );

  userInfo.addresses.forEach((address, index) => {
    addressColumn.node.appendChild(createAddressProfileSection(address, index, updatedUserInfo));
  });

  const addNewAddressButton = new ButtonComponent(
    'button',
    (event) => {
      event.stopPropagation();
    },
    'Add new address',
    false,
  );

  addNewAddressButton.node.classList.add(CLASS_NAMES.profileAddAddressButton);

  contentWrapper.node.append(infoColumn.node, addressColumn.node, addNewAddressButton.node);
}