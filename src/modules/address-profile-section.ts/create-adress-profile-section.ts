import { Address, CustomerIncomeData } from '../../types/index';
import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import LabelComponent from '../../components/label-component';

export default function createAddressProfileSection(address: Address, index: number, userInfo: CustomerIncomeData) {
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

  const fields = [
    { label: 'Street:', value: address.streetName, id: `address-street-${index}` },
    { label: 'City:', value: address.city, id: `address-city-${index}` },
    { label: 'State:', value: address.state, id: `address-state-${index}` },
    { label: 'Postal Code:', value: address.postalCode, id: `address-postal-code-${index}` },
    { label: 'Country:', value: address.country, id: `address-country-${index}` },
  ];

  fields.forEach((field) => {
    if (field.value) {
      const labelComponent = new LabelComponent(field.label);
      labelComponent.node.setAttribute('for', field.id);
      const textComponent = new BaseTextComponent('span', 'profile_page__address', field.value);
      textComponent.node.id = field.id;
      addressWrapper.node.append(labelComponent.node, textComponent.node);
    }
  });

  return addressWrapper.node;
}
