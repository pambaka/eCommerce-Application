import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import LabelComponent from '../../../components/label-component';
import { CustomerIncomeData } from '../../../types/index';

export default function renderProfileSectionContent(userInfo: CustomerIncomeData, parentNode: HTMLElement) {
  const contentWrapper = new BaseComponent('div', 'profile_page__content_wrapper');
  parentNode.appendChild(contentWrapper.node);

  const infoColumn = new BaseComponent('div', 'profile_page__info_column');
  const addressColumn = new BaseComponent('div', 'profile_page__address_column');

  // Read-only fields
  const nameLabel = new LabelComponent('Name:');
  const nameText = new BaseTextComponent('p', 'profile_page__info', userInfo.firstName);
  infoColumn.node.append(nameLabel.node, nameText.node);

  const surnameLabel = new LabelComponent('Surname:');
  const surnameText = new BaseTextComponent('p', 'profile_page__info', userInfo.lastName);
  infoColumn.node.append(surnameLabel.node, surnameText.node);

  const dobLabel = new LabelComponent('Date of Birth:');
  const dobText = new BaseTextComponent('p', 'profile_page__info', userInfo.dateOfBirth);
  infoColumn.node.append(dobLabel.node, dobText.node);

  const emailLabel = new LabelComponent('Email:');
  const emailText = new BaseTextComponent('p', 'profile_page__info', userInfo.email);
  infoColumn.node.append(emailLabel.node, emailText.node);

  // Read-only addresses
  userInfo.addresses.forEach((address, index) => {
    const addressWrapper = new BaseComponent('div', 'profile_page__address_wrapper');
    let addressTitleText = `Address ${index + 1}`;

    if (userInfo?.shippingAddressIds.includes(address?.id ?? '')) {
      addressTitleText = 'Shipping Address';
    } else if (userInfo?.billingAddressIds.includes(address?.id ?? '')) {
      addressTitleText = 'Billing Address';
    }

    const addressTitle = new BaseTextComponent('h3', 'profile_page__address_title', addressTitleText);
    addressWrapper.node.appendChild(addressTitle.node);

    if (userInfo?.defaultShippingAddressId === address.id) {
      addressWrapper.node.classList.add('default-shipping');
      const defaultShippingLabel = new BaseTextComponent('p', 'profile_page__default_label', 'Default');
      addressWrapper.node.appendChild(defaultShippingLabel.node);
    }
    if (userInfo?.defaultBillingAddressId === address.id) {
      addressWrapper.node.classList.add('default-billing');
      const defaultBillingLabel = new BaseTextComponent('p', 'profile_page__default_label', 'Default');
      addressWrapper.node.appendChild(defaultBillingLabel.node);
    }

    const streetLabel = new LabelComponent('Street:');
    const streetText = new BaseTextComponent('p', 'profile_page__address', address.streetName);
    addressWrapper.node.append(streetLabel.node, streetText.node);

    const cityLabel = new LabelComponent('City:');
    const cityText = new BaseTextComponent('p', 'profile_page__address', address.city);
    addressWrapper.node.append(cityLabel.node, cityText.node);

    if (address.state) {
      const stateLabel = new LabelComponent('State:');
      const stateText = new BaseTextComponent('p', 'profile_page__address', address.state);
      addressWrapper.node.append(stateLabel.node, stateText.node);
    }

    const postalCodeLabel = new LabelComponent('Postal Code:');
    const postalCodeText = new BaseTextComponent('p', 'profile_page__address', address.postalCode);
    addressWrapper.node.append(postalCodeLabel.node, postalCodeText.node);

    const countryLabel = new LabelComponent('Country:');
    const countryText = new BaseTextComponent('p', 'profile_page__address', address.country);
    addressWrapper.node.append(countryLabel.node, countryText.node);

    addressColumn.node.appendChild(addressWrapper.node);
  });

  contentWrapper.node.append(infoColumn.node, addressColumn.node);
}
