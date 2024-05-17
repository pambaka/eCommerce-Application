import BaseComponent from './base-component';
import NavItemComponent from './navigation-component';
import Router from '../services/router';

export default class SideMenuComponent extends BaseComponent {
  constructor(toggleFunction: (event?: Event) => void) {
    super('div', 'side-menu');
    this.node.classList.add('hidden');
    this.renderMenuItems(toggleFunction);
  }

  renderMenuItems(toggleFunction: (event?: Event) => void) {
    const ul = new BaseComponent('ul', 'side-menu-nav');

    const menuItems = [
      new NavItemComponent(Router.pages.main, 'Home'),
      new NavItemComponent(Router.pages.about, 'About'),
      new NavItemComponent(Router.pages.catalog, 'Catalog'),
      new NavItemComponent(Router.pages.login, 'Log in'),
      new NavItemComponent(Router.pages.signup, 'Sign up'),
      new NavItemComponent(Router.pages.cart, 'Cart'),
    ];

    menuItems.forEach((item) => {
      item.node.addEventListener('click', toggleFunction);
      ul.node.appendChild(item.node);
    });

    this.node.appendChild(ul.node);
  }
}
