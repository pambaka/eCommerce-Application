import BaseComponent from './base-component';
import NavItemComponent from './navigation-component';
import Router from '../services/router';
import isCustomerAuthorized from '../utils/is-customer-authorized';
import { subscribeToAuthorizationChangeEvent, dispatchAuthorizationChangeEvent } from '../utils/authorization-event';

export default class SideMenuComponent extends BaseComponent {
  constructor(toggleFunction: (event?: Event) => void) {
    super('div', 'side-menu');
    this.node.classList.add('hidden');
    this.renderMenuItems(toggleFunction);
    this.subscribeToAuthorizationChanges(toggleFunction);
  }

  renderMenuItems(toggleFunction: (event?: Event) => void) {
    const ul = new BaseComponent('ul', 'side-menu-nav');
    ul.node.innerHTML = '';

    const menuItems: NavItemComponent[] = [
      new NavItemComponent(Router.pages.main, 'Home'),
      new NavItemComponent(Router.pages.about, 'About'),
      new NavItemComponent(Router.pages.catalog, 'Catalog'),
      new NavItemComponent(Router.pages.cart, 'Cart'),
    ];

    let logoutItem: NavItemComponent | null = null;

    if (isCustomerAuthorized()) {
      logoutItem = new NavItemComponent(Router.pages.main, 'Logout');
      logoutItem.node.addEventListener('click', () => {
        sessionStorage.clear();
        dispatchAuthorizationChangeEvent(false);
        toggleFunction();
      });
      menuItems.push(logoutItem);
    } else {
      menuItems.push(new NavItemComponent(Router.pages.login, 'Log in'));
      menuItems.push(new NavItemComponent(Router.pages.registration, 'Sign up'));
    }

    menuItems.forEach((item) => {
      if (logoutItem === null || item !== logoutItem) {
        item.node.addEventListener('click', toggleFunction);
      }
      ul.node.appendChild(item.node);
    });

    this.node.appendChild(ul.node);
  }

  subscribeToAuthorizationChanges(toggleFunction: (event?: Event) => void) {
    subscribeToAuthorizationChangeEvent(() => {
      this.node.innerHTML = '';
      this.renderMenuItems(toggleFunction);
    });
  }
}
