import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';

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

    const logoImg = new BaseComponent('img');
    logoImg.node.setAttribute('src', 'https://www.svgrepo.com/show/530309/bird.svg');
    logoImg.node.setAttribute('alt', 'logo');
    logoImg.node.classList.add('logo_img');
    logoImg.node.setAttribute('width', '100');
    logoImg.node.setAttribute('height', '100');
    wrapper.node.appendChild(logoImg.node);

    const signupLink = new BaseComponent('a', 'main_page__signup');
    signupLink.node.setAttribute('href', '#signup');
    wrapper.node.appendChild(signupLink.node);

    const signupButton = new ButtonComponent('main_page__btn', () => {}, 'Create an account', false);
    signupButton.node.classList.add('btn');
    signupLink.node.appendChild(signupButton.node);

    const loginText = new BaseTextComponent('p', 'main_page__login', 'Already have an account? Log in ');
    wrapper.node.appendChild(loginText.node);

    const loginLink = new BaseComponent('a');
    loginLink.node.setAttribute('href', '#login');
    loginLink.node.textContent = 'here';
    loginText.node.appendChild(loginLink.node);
  }
}
