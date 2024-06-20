import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import getUserInfo from '../../../api/get-user-info';
import { CustomerIncomeData } from '../../../types/index';
import renderProfileSectionContent from '../render/render-profile-section';
import Spinner from '../../../components/spinner-component';

export default class ProfileSection extends BaseComponent {
  private userInfo: CustomerIncomeData | undefined;

  private spinner: Spinner;

  constructor() {
    super('div', 'profile_page__wrapper');
    this.spinner = new Spinner();
    this.renderProfileSection();
  }

  static renderError(parentNode: HTMLElement, message: string) {
    const errorText = new BaseTextComponent('p', 'error', message);
    parentNode.appendChild(errorText.node);
  }

  async renderProfileSection() {
    this.node.innerHTML = '';
    const title = new BaseTextComponent('h1', 'profile_page__title', 'User Profile');
    this.node.append(title.node, this.spinner.node);

    try {
      this.userInfo = await getUserInfo();

      if (!this.userInfo) {
        ProfileSection.renderError(this.node, 'Failed to load user data');
        return;
      }

      renderProfileSectionContent(this.userInfo, this.node);
    } catch (error) {
      ProfileSection.renderError(this.node, 'Failed to load user data');
    } finally {
      this.spinner.node.remove();
    }
  }
}
