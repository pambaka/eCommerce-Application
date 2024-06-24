import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import getUserInfo from '../../../api/get-user-info';
import { CustomerIncomeData } from '../../../types/index';
import RenderProfileSectionContent from '../render/render-profile-section';

export default class ProfileSection extends BaseComponent {
  public userInfo: CustomerIncomeData | undefined;

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

    const profileContent = new RenderProfileSectionContent(this.userInfo, this.node);

    const tabs = new BaseComponent('div', 'tabs');
    const infoTab = new BaseTextComponent('button', 'tab', 'Personal Info');
    const addressTab = new BaseTextComponent('button', 'tab', 'Addresses');

    const setActiveTab = (activeTab: HTMLElement) => {
      [infoTab.node, addressTab.node].forEach((tab) => {
        tab.classList.remove('active');
      });
      activeTab.classList.add('active');
    };

    infoTab.node.addEventListener('click', () => {
      profileContent.showInfo();
      setActiveTab(infoTab.node);
    });

    addressTab.node.addEventListener('click', () => {
      profileContent.showAddresses();
      setActiveTab(addressTab.node);
    });

    tabs.node.append(infoTab.node, addressTab.node);
    this.node.insertBefore(tabs.node, title.node.nextSibling);

    profileContent.showInfo();
    setActiveTab(infoTab.node);
  }
}
