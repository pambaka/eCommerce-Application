import BaseComponent from '../../../components/base-component';
import AddressSectionComponent from '../../../modules/address-module';
import { CustomerIncomeData, Address } from '../../../types/index';
import createEditableFieldWithHandler from './editable-field/create-editable-field-with-handler';
import ButtonComponent from '../../../components/button-component';
import { CLASS_NAMES, ID_NAMES } from '../../../const';
import updateAddNewAddressButtonState from './editable-field/update-new-address-button';

// export default function renderProfileSectionContent(userInfo: CustomerIncomeData, parentNode: HTMLElement) {
//   const contentWrapper = new BaseComponent('div', CLASS_NAMES.profileContentWrapper);
//   parentNode.appendChild(contentWrapper.node);

//   const infoColumn = new BaseComponent('div', CLASS_NAMES.profileInfoColumn);
//   const addressColumn = new BaseComponent('div', CLASS_NAMES.profileAddressColumn);

//   const updatedUserInfo = { ...userInfo };

//   const firstNameField = createEditableFieldWithHandler(
//     'First name:',
//     userInfo.firstName,
//     ID_NAMES.customerName,
//     (newValue) => {
//       updatedUserInfo.firstName = newValue;
//     },
//     CLASS_NAMES.profileEditableField,
//     CLASS_NAMES.profileInput,
//   );

//   const lastNameField = createEditableFieldWithHandler(
//     'Last name:',
//     userInfo.lastName,
//     ID_NAMES.customerSurname,
//     (newValue) => {
//       updatedUserInfo.lastName = newValue;
//     },
//     CLASS_NAMES.profileEditableField,
//     CLASS_NAMES.profileInput,
//   );

//   const dobField = createEditableFieldWithHandler(
//     'Date of Birth:',
//     userInfo.dateOfBirth,
//     ID_NAMES.customerDob,
//     (newValue) => {
//       updatedUserInfo.dateOfBirth = newValue;
//     },
//     CLASS_NAMES.profileEditableField,
//     CLASS_NAMES.profileInput,
//   );

//   const emailField = createEditableFieldWithHandler(
//     'Email:',
//     userInfo.email,
//     ID_NAMES.customerEmail,
//     (newValue) => {
//       updatedUserInfo.email = newValue;
//     },
//     CLASS_NAMES.profileEditableField,
//     CLASS_NAMES.profileInput,
//   );

//   const passwordField = createEditableFieldWithHandler(
//     'Edit password',
//     '',
//     ID_NAMES.customerPassword,
//     () => {},
//     CLASS_NAMES.profileEditableField,
//     CLASS_NAMES.profileInput,
//   );

//   infoColumn.node.append(firstNameField, lastNameField, dobField, emailField, passwordField);

//   const addressSections: AddressSectionComponent[] = [];

//   userInfo.addresses.forEach((address, index) => {
//     const addressSection = new AddressSectionComponent(address, index, updatedUserInfo);
//     addressSections.push(addressSection);
//     addressColumn.node.appendChild(addressSection.node);
//   });

//   const addNewAddressButton = new ButtonComponent(
//     'button',
//     (event) => {
//       event.stopPropagation();
//       const newAddress: Address = {
//         id: `new-${Date.now()}`,
//         streetName: '',
//         city: '',
//         state: '',
//         postalCode: '',
//         country: '',
//       };
//       updatedUserInfo.addresses.push(newAddress);
//       const newAddressSection = new AddressSectionComponent(
//         newAddress,
//         updatedUserInfo.addresses.length - 1,
//         updatedUserInfo,
//         true,
//       );
//       addressSections.push(newAddressSection);
//       addressColumn.node.appendChild(newAddressSection.node);
//       updateAddNewAddressButtonState(addressSections, addNewAddressButton);
//     },
//     'Add new address',
//     false,
//   );

//   addNewAddressButton.node.classList.add(CLASS_NAMES.profileAddAddressButton);

//   addressSections.forEach((section) => {
//     const addressSection = section;
//     addressSection.onFieldChange = () => updateAddNewAddressButtonState(addressSections, addNewAddressButton);
//     addressSection.onSaveButtonClick = () => updateAddNewAddressButtonState(addressSections, addNewAddressButton);
//   });

//   contentWrapper.node.append(infoColumn.node, addressColumn.node, addNewAddressButton.node);
//   updateAddNewAddressButtonState(addressSections, addNewAddressButton);
// }

export default function renderProfileSectionContent(userInfo: CustomerIncomeData, parentNode: HTMLElement) {
  const contentWrapper = new BaseComponent('div', CLASS_NAMES.profileContentWrapper);
  parentNode.appendChild(contentWrapper.node);

  const infoColumn = new BaseComponent('div', CLASS_NAMES.profileInfoColumn);
  const addressColumn = new BaseComponent('div', CLASS_NAMES.profileAddressColumn);
  const updatedUserInfo = { ...userInfo };

  const firstNameField = createEditableFieldWithHandler(
    'First name:',
    userInfo.firstName,
    ID_NAMES.customerName,
    (newValue) => {
      updatedUserInfo.firstName = newValue;
    },
    CLASS_NAMES.profileEditableField,
    CLASS_NAMES.profileInput,
  );

  const lastNameField = createEditableFieldWithHandler(
    'Last name:',
    userInfo.lastName,
    ID_NAMES.customerSurname,
    (newValue) => {
      updatedUserInfo.lastName = newValue;
    },
    CLASS_NAMES.profileEditableField,
    CLASS_NAMES.profileInput,
  );

  const dobField = createEditableFieldWithHandler(
    'Date of Birth:',
    userInfo.dateOfBirth,
    ID_NAMES.customerDob,
    (newValue) => {
      updatedUserInfo.dateOfBirth = newValue;
    },
    CLASS_NAMES.profileEditableField,
    CLASS_NAMES.profileInput,
  );

  const emailField = createEditableFieldWithHandler(
    'Email:',
    userInfo.email,
    ID_NAMES.customerEmail,
    (newValue) => {
      updatedUserInfo.email = newValue;
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

  infoColumn.node.append(firstNameField, lastNameField, dobField, emailField, passwordField);

  const addressSections: AddressSectionComponent[] = [];

  const addNewAddressButton = new ButtonComponent(
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
      updatedUserInfo.addresses.push(newAddress);
      const newAddressSection = new AddressSectionComponent(
        newAddress,
        updatedUserInfo.addresses.length - 1,
        updatedUserInfo,
        updateAddNewAddressButtonState.bind(null, addressSections, addNewAddressButton),
        true,
      );
      addressSections.push(newAddressSection);
      addressColumn.node.appendChild(newAddressSection.node);
      updateAddNewAddressButtonState(addressSections, addNewAddressButton);
    },
    'Add new address',
    false,
  );

  addNewAddressButton.node.classList.add(CLASS_NAMES.profileAddAddressButton);

  userInfo.addresses.forEach((address, index) => {
    const addressSection = new AddressSectionComponent(
      address,
      index,
      updatedUserInfo,
      updateAddNewAddressButtonState.bind(null, addressSections, addNewAddressButton),
    );
    addressSections.push(addressSection);
    addressColumn.node.appendChild(addressSection.node);
  });

  addressSections.forEach((section) => {
    const addressSection = section;
    addressSection.onFieldChange = () => updateAddNewAddressButtonState(addressSections, addNewAddressButton);
    addressSection.onSaveButtonClick = () => updateAddNewAddressButtonState(addressSections, addNewAddressButton);
  });

  contentWrapper.node.append(infoColumn.node, addressColumn.node, addNewAddressButton.node);
  updateAddNewAddressButtonState(addressSections, addNewAddressButton);
}
