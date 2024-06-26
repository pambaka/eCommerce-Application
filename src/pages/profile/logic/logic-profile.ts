import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import getUserInfo from '../../../api/get-user-info';
import { CustomerIncomeData } from '../../../types/index';
import renderProfileSectionContent from '../render/render-profile-section';

export default class ProfileSection extends BaseComponent {
  private userInfo: CustomerIncomeData | undefined;

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

    this.userInfo = await getUserInfo();

    if (!this.userInfo) {
      ProfileSection.renderError(this.node, 'Failed to load user data');
      return;
    }

    renderProfileSectionContent(this.userInfo, this.node);
  }
}
