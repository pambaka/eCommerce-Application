import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';

export default class Header extends BaseComponent {
  constructor() {
    super('header', 'header');
    this.renderHeader();
  }

  static createNavItem(href: string, text: string): HTMLElement {
    const li = new BaseComponent('li', 'nav_item');
    const a = new BaseComponent('a', 'nav_link');
    a.node.setAttribute('href', href);
    a.node.textContent = text;
    li.node.appendChild(a.node);
    return li.node;
  }

  renderHeader() {
    const nav = new BaseComponent('nav', 'main_navigation');
    const ul = new BaseComponent('ul', 'nav');
    ul.node.classList.add('nav_header');

    // Logo and text
    const logoItem = new BaseComponent('li', 'nav_item');
    const logoLink = new BaseComponent('a', 'header_logo');
    logoLink.node.setAttribute('href', '#main');
    const logoImage = new BaseComponent('img');
    logoImage.node.setAttribute('src', 'https://www.svgrepo.com/show/530291/leaves-2.svg');
    logoImage.node.setAttribute('alt', 'logo');
    logoImage.node.setAttribute('width', '50');
    logoImage.node.setAttribute('height', '50');
    const logoText = new BaseTextComponent('h1', 'logo_text', 'KeepCalm');

    logoLink.node.appendChild(logoImage.node);
    logoLink.node.appendChild(logoText.node);
    logoItem.node.appendChild(logoLink.node);
    ul.node.appendChild(logoItem.node);

    // Navigation items
    ul.node.appendChild(Header.createNavItem('#main', 'Home'));
    ul.node.appendChild(Header.createNavItem('#about', 'About'));
    ul.node.appendChild(Header.createNavItem('#catalog', 'Catalog'));
    ul.node.appendChild(Header.createNavItem('#login', 'Log in'));
    ul.node.appendChild(Header.createNavItem('#signup', 'Sign up'));

    // Cart icon
    const cartItem = new BaseComponent('li', 'nav_item');
    cartItem.node.classList.add('nav_item_signup');
    const cartLink = new BaseComponent('a', 'nav_link');
    cartLink.node.setAttribute('href', '#cart');
    const cartIcon = new BaseComponent('img');
    cartIcon.node.setAttribute('src', 'https://www.svgrepo.com/show/529445/cart-3.svg');
    cartIcon.node.setAttribute('alt', 'cart');
    cartIcon.node.setAttribute('width', '50');
    cartIcon.node.setAttribute('height', '50');
    cartLink.node.appendChild(cartIcon.node);
    cartItem.node.appendChild(cartLink.node);
    ul.node.appendChild(cartItem.node);

    nav.node.appendChild(ul.node);
    this.node.appendChild(nav.node);
  }
}
