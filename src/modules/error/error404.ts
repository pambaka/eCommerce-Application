import BaseComponent from '../../components/base-component';
import Router from '../../services/router';

export default class ErrorSection extends BaseComponent {
  public container: HTMLElement;

  constructor() {
    super('section', 'error_page');
    this.container = this.node;
    this.renderErrorSection();
  }

  renderErrorSection() {
    this.node.innerHTML = `
            <div class="error_page__wrapper">
                <img src="https://www.svgrepo.com/show/530299/cactus.svg" alt="logo" class="logo_img" width="100" height="100">
                <h1 class="main_page__title">ERROR 404</h1>
                <p class="subtitle">Page not found</p>
                <a class="main_page__signup" href=${Router.pages.main}>
                    <button class="main_page__btn btn">Return</button>
                </a>
            </div>
        `;
  }
}
