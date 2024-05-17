import BaseComponent from './base-component';
import NavItemComponent from './navigation-component';

export default class SideMenuComponent extends BaseComponent {
  constructor(toggleFunction: (event?: Event) => void) {
    super('div', 'side-menu');
    this.node.classList.add('hidden');
    this.renderMenuItems(toggleFunction);
  }

  renderMenuItems(toggleFunction: (event?: Event) => void) {
    const ul = new BaseComponent('ul', 'side-menu-nav');

    const menuItems = [
      new NavItemComponent('#main', 'Home'),
      new NavItemComponent('#about', 'About'),
      new NavItemComponent('#catalog', 'Catalog'),
      new NavItemComponent('#login', 'Log in'),
      new NavItemComponent('#signup', 'Sign up'),
      new NavItemComponent('#cart', 'Cart'),
    ];

    menuItems.forEach((item) => {
      item.node.addEventListener('click', toggleFunction);
      ul.node.appendChild(item.node);
    });

    this.node.appendChild(ul.node);
  }
}
