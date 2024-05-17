import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import BaseLinkComponent from '../../../components/base-link-component';
import BaseImageComponent from '../../../components/base-image-component';
import Router from '../../../services/router';

export default class MainSection extends BaseComponent {
  constructor() {
    super('section', 'main_page');
    this.renderMainSection();
  }

  renderMainSection() {
    const wrapper = new BaseComponent('div', 'main_page__wrapper');
    this.node.appendChild(wrapper.node);

    const subtitle = new BaseTextComponent('p', 'subtitle', 'Keep Calm and Code');
    wrapper.node.appendChild(subtitle.node);

    const title = new BaseTextComponent('h1', 'main_page__title', 'The best IT Products');
    wrapper.node.appendChild(title.node);

    const logoImg = new BaseImageComponent('logo_img', 'https://www.svgrepo.com/show/530309/bird.svg', 'logo');
    wrapper.node.appendChild(logoImg.node);

    const signupLink = new BaseLinkComponent(
      Router.pages.registration,
      'main_page__signup',
      'Do not have an account yet?',
    );
    wrapper.node.appendChild(signupLink.node);

    const signupButton = new ButtonComponent('main_page__btn', () => {}, 'Create an account', false);
    signupButton.node.classList.add('button');
    signupLink.node.appendChild(signupButton.node);

    const loginText = new BaseTextComponent('p', 'main_page__login', 'Already have an account? Log in ');
    wrapper.node.appendChild(loginText.node);

    const loginLink = new BaseLinkComponent('#login', '', 'here');
    loginText.node.appendChild(loginLink.node);
  }
}
