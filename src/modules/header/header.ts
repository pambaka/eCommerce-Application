import BaseComponent from '../../components/base-component';

export default class Header extends BaseComponent {
  public container: HTMLElement;

  constructor() {
    super('header', 'header');
    this.container = this.node;
    this.renderHeader();
  }

  renderHeader() {
    const nav = document.createElement('nav');
    nav.className = 'main_navigation';

    nav.innerHTML = `
      <ul class="nav nav_header">
        <li class="nav_item">
          <a href="#main" class="header_logo">
            <img src="https://www.svgrepo.com/show/530291/leaves-2.svg" alt="logo" class="logo" width="50" height="50">
            <h1 class="logo_text">KeepCalm</h1>
          </a>
        </li>
        <li class="nav_item"><a href="#main" class="nav_link">Home</a></li>
        <li class="nav_item"><a href="#about" class="nav_link">About</a></li>
        <li class="nav_item"><a href="#catalog" class="nav_link link">Catalog</a></li>
        <li class="nav_item nav_item_login"><a href="#login" class="nav_link">Log in</a></li>
        <li class="nav_item nav_item_signup"><a href="#signup" class="nav_link">Sign up</a></li>
        <li class="nav_item nav_item_signup"><a href="#cart" class="nav_link"> <img src="https://www.svgrepo.com/show/529445/cart-3.svg" alt="cart" class="logo" width="50" height="50"></a></li>

      </ul>
    `;

    this.container.append(nav);
  }
}
