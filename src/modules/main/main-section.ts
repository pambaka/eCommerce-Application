import BaseComponent from '../../components/base-component';
import Router from '../../services/router';

export default class MainSection extends BaseComponent {
  public container: HTMLElement;

  constructor() {
    super('section', 'main_page');
    this.container = this.node;
    this.renderMainSection();
  }

  renderMainSection() {
    this.node.innerHTML = `
            <div class="main_page__wrapper">
                <p class="subtitle">Keep Calm and Code</p>
                <h1 class="main_page__title">The best IT Products</h1>
                <img src="https://www.svgrepo.com/show/530309/bird.svg" alt="logo" class="logo_img" width="100" height="100">

                <a class="main_page__signup" href=${Router.pages.signup}>
                    <button class="main_page__btn btn">Create an account</button>
                </a>
                <p class="main_page__login">Already have an account? Log in <a href=${Router.pages.login}>here</a></p>
            </div>
        `;
  }
}
