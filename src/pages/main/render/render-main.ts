import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import BaseLinkComponent from '../../../components/base-link-component';
import BaseImageComponent from '../../../components/base-image-component';
import Router from '../../../services/router';
import isCustomerAuthorized from '../../../utils/is-customer-authorized';
import { subscribeToAuthorizationChangeEvent } from '../../../utils/authorization-event';
import PromoCodeModule from '../../../modules/promo-code-module';
import image1 from '../../../assets/images/1.jpg';
import image2 from '../../../assets/images/2.jpg';
import image3 from '../../../assets/images/3.jpg';

export default class MainSection extends BaseComponent {
  constructor() {
    super('section', 'main_page');
    this.subscribeToAuthorizationChanges();
    this.renderMainSection();
  }

  renderMainSection() {
    this.node.innerHTML = '';
    const wrapper = new BaseComponent('div', 'main_page__wrapper');
    this.node.appendChild(wrapper.node);

    const title = new BaseTextComponent('h1', 'main_page__title', 'Explore the world with our toys');
    wrapper.node.appendChild(title.node);

    const promoCodeComponent = new PromoCodeModule({
      images: [image1, image2, image3],
      promoText: 'Use code <span class="highlight">CALM20</span> for 20% off!',
    });
    wrapper.node.appendChild(promoCodeComponent.node);

    if (isCustomerAuthorized()) {
      const userName = localStorage.getItem('userName') || 'User';
      const welcomeText = new BaseTextComponent('p', 'welcome_text', `Hello, ${userName}! Have a nice shopping!`);
      wrapper.node.appendChild(welcomeText.node);
    } else {
      const signupLink = new BaseLinkComponent(
        Router.pages.registration,
        'main_page__signup',
        'Do not have an account yet?',
      );
      wrapper.node.appendChild(signupLink.node);

      const logoImg = new BaseImageComponent('logo_img', 'https://www.svgrepo.com/show/530309/bird.svg', 'logo');
      wrapper.node.appendChild(logoImg.node);

      const signupButton = new ButtonComponent('main_page__btn', () => {}, 'Create an account', false);
      signupButton.node.classList.add('button');
      signupLink.node.appendChild(signupButton.node);

      const loginText = new BaseTextComponent('p', 'main_page__login', 'Already have an account? Log in ');
      wrapper.node.appendChild(loginText.node);

      const loginLink = new BaseLinkComponent('#login', '', 'here');
      loginText.node.appendChild(loginLink.node);
    }
  }

  subscribeToAuthorizationChanges() {
    subscribeToAuthorizationChangeEvent(() => {
      this.renderMainSection();
    });
  }
}
