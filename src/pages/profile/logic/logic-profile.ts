import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import LabelComponent from '../../../components/label-component';
import { getUserInfo, getUserAddresses } from '../../../api/user-service';
import { CustomerData, Address } from '../../../types/index';

export default class ProfileSection extends BaseComponent {
  private userInfo: CustomerData = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    addresses: [],
    shippingAddresses: [0],
    billingAddresses: [1],
    password: '',
  };

  private userAddresses: Address[] = [];

  constructor() {
    super('div', 'profile_page__wrapper');
    this.renderProfileSection();
  }

  static renderError(parentNode: HTMLElement, message: string) {
    const errorText = new BaseTextComponent('p', 'error', message);
    parentNode.appendChild(errorText.node);
  }

  async renderProfileSection() {
    this.node.innerHTML = '';
    const title = new BaseTextComponent('h1', 'profile_page__title', 'User Profile');
    this.node.appendChild(title.node);

    try {
      this.userInfo = await getUserInfo();
      this.userAddresses = await getUserAddresses();
    } catch (error) {
      console.error('Error loading user data:', error);
      ProfileSection.renderError(this.node, 'Failed to load user data');
      return;
    }

    const contentWrapper = new BaseComponent('div', 'profile_page__content_wrapper');
    this.node.appendChild(contentWrapper.node);

    const infoColumn = new BaseComponent('div', 'profile_page__info_column');
    const addressColumn = new BaseComponent('div', 'profile_page__address_column');

    this.renderUserInfo(infoColumn);
    this.renderUserAddresses(addressColumn);

    contentWrapper.node.append(infoColumn.node, addressColumn.node);
  }

  private renderUserInfo(parentNode: BaseComponent) {
    const fields = [
      { label: 'Name:', value: this.userInfo.firstName },
      { label: 'Surname:', value: this.userInfo.lastName },
      { label: 'Date of Birth:', value: this.userInfo.dateOfBirth },
    ];

    fields.forEach((field) => {
      const label = new LabelComponent(field.label);
      const text = new BaseTextComponent('p', 'profile_page__info', field.value);
      parentNode.node.append(label.node, text.node);
    });
  }

  private renderUserAddresses(parentNode: BaseComponent) {
    const uniqueAddresses: { [key: string]: { address: Address; types: string[] } } = {};

    this.userAddresses.forEach((address) => {
      const addressKey = `${address.streetName}-${address.postalCode}-${address.city}-${address.country}`;
      if (!uniqueAddresses[addressKey]) {
        uniqueAddresses[addressKey] = { address, types: [] };
      }
      if (this.userInfo.defaultShippingAddressId === address.id) {
        uniqueAddresses[addressKey].types.push('default-shipping');
      }
      if (this.userInfo.defaultBillingAddressId === address.id) {
        uniqueAddresses[addressKey].types.push('default-billing');
      }
    });

    Object.values(uniqueAddresses).forEach(({ address, types }, index) => {
      const addressWrapper = new BaseComponent('div', 'profile_page__address_wrapper');
      types.forEach((type) => addressWrapper.node.classList.add(type));

      const addressTitle = new BaseTextComponent('h3', 'profile_page__address_title', `Address ${index + 1}`);
      addressWrapper.node.appendChild(addressTitle.node);

      types.forEach((type) => {
        const typeLabel = new BaseTextComponent('p', 'profile_page__default_label', type.replace('-', ' '));
        addressWrapper.node.appendChild(typeLabel.node);
      });

      const addressFields = [
        { label: 'Street:', value: address.streetName },
        { label: 'City:', value: address.city },
        { label: 'State:', value: address.state },
        { label: 'Postal Code:', value: address.postalCode },
        { label: 'Country:', value: address.country },
      ];

      addressFields.forEach((field) => {
        if (field.value) {
          const label = new LabelComponent(field.label);
          const text = new BaseTextComponent('p', 'profile_page__address', field.value);
          addressWrapper.node.append(label.node, text.node);
        }
      });

      parentNode.node.appendChild(addressWrapper.node);
    });
  }
}
