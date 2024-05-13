import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import Router from '../../../services/router';

export default class ErrorSection extends BaseComponent {
  constructor() {
    super('section', 'error_page');
    this.renderErrorSection();
  }

  renderErrorSection() {
    const wrapper = new BaseComponent('div', 'error_page__wrapper');

    const logoImg = new BaseComponent('img');
    logoImg.node.setAttribute('src', 'https://www.svgrepo.com/show/530299/cactus.svg');
    logoImg.node.setAttribute('alt', 'logo');
    logoImg.node.setAttribute('width', '100');
    logoImg.node.setAttribute('height', '100');

    const title = new BaseTextComponent('h1', 'main_page__title', 'ERROR 404');
    const subtitle = new BaseTextComponent('p', 'subtitle', 'Page not found');

    const returnButton = new ButtonComponent(
      'main_page__btn',
      () => {
        window.location.href = Router.pages.main;
      },
      'Return',
      false,
    );

    returnButton.node.classList.add('btn');
    wrapper.node.appendChild(logoImg.node);
    wrapper.node.appendChild(title.node);
    wrapper.node.appendChild(subtitle.node);
    const linkWrapper = new BaseComponent('a', 'main_page__signup');
    linkWrapper.node.setAttribute('href', Router.pages.main);
    linkWrapper.node.appendChild(returnButton.node);
    wrapper.node.appendChild(linkWrapper.node);

    this.node.appendChild(wrapper.node);
  }
}
