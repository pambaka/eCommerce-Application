import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import BaseImageComponent from '../../../components/base-image-component';
import BaseLinkComponent from '../../../components/base-link-component';
import Router from '../../../services/router';
// Temporarily replaced Router.pages.main with a '/' stub until the router is implemented

export default class ErrorSection extends BaseComponent {
  constructor() {
    super('section', 'error_page');
    this.renderErrorSection();
  }

  renderErrorSection() {
    const wrapper = new BaseComponent('div', 'error_page__wrapper');

    const errorImg = new BaseImageComponent('error-image', 'https://www.svgrepo.com/show/530299/cactus.svg', 'logo');
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
    returnButton.node.classList.add('button');

    const linkWrapper = new BaseLinkComponent(Router.pages.main, 'main_page__signup', '');
    linkWrapper.node.append(returnButton.node);

    wrapper.node.append(errorImg.node, title.node, subtitle.node, linkWrapper.node);
    this.node.appendChild(wrapper.node);
  }
}
