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

    // Read-only fields
    const nameLabel = new LabelComponent('Name:');
    const nameText = new BaseTextComponent('p', 'profile_page__info', this.userInfo.firstName);
    infoColumn.node.append(nameLabel.node, nameText.node);

    const surnameLabel = new LabelComponent('Surname:');
    const surnameText = new BaseTextComponent('p', 'profile_page__info', this.userInfo.lastName);
    infoColumn.node.append(surnameLabel.node, surnameText.node);

    const dobLabel = new LabelComponent('Date of Birth:');
    const dobText = new BaseTextComponent('p', 'profile_page__info', this.userInfo.dateOfBirth);
    infoColumn.node.append(dobLabel.node, dobText.node);

    // Read-only addresses
    const uniqueAddresses: { [key: string]: { address: Address; types: string[] } } = {};

    this.userAddresses.forEach((address) => {
      const addressKey = `${address.streetName}-${address.postalCode}-${address.city}-${address.country}`;
      if (!uniqueAddresses[addressKey]) {
        uniqueAddresses[addressKey] = { address, types: [] };
      }
      if (this.userInfo.defaultShippingAddressId === address.id) {
        uniqueAddresses[addressKey].types.push('Default Shipping Address');
      }
      if (this.userInfo.defaultBillingAddressId === address.id) {
        uniqueAddresses[addressKey].types.push('Default Billing Address');
      }
    });

    Object.values(uniqueAddresses).forEach(({ address, types }, index) => {
      const addressWrapper = new BaseComponent('div', 'profile_page__address_wrapper');
      const addressTitle = new BaseTextComponent('h3', 'profile_page__address_title', `Address ${index + 1}`);
      addressWrapper.node.appendChild(addressTitle.node);

      types.forEach((type) => {
        const typeLabel = new BaseTextComponent('p', 'profile_page__default_label', type);
        addressWrapper.node.appendChild(typeLabel.node);
      });

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
}
