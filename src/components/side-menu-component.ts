import BaseComponent from './base-component';
import NavItemComponent from './navigation-component';
import Router from '../services/router';
import isCustomerAuthorized from '../utils/is-customer-authorized';
import { subscribeToAuthorizationChangeEvent, dispatchAuthorizationChangeEvent } from '../utils/authorization-event';
import replaceLocation from '../utils/replace-location';

export default class SideMenuComponent extends BaseComponent {
  constructor(toggleFunction: (event?: Event) => void) {
    super('div', 'side-menu');
    this.node.classList.add('hidden');
    this.renderMenuItems(toggleFunction);
    this.subscribeToAuthorizationChanges(toggleFunction);
  }

  renderMenuItems(toggleFunction: (event?: Event) => void) {
    const menuContainer = new BaseComponent('div', 'side-menu-container');
    const ul = new BaseComponent('ul', 'side-menu-nav');
    ul.node.innerHTML = '';

    const menuItems: NavItemComponent[] = [
      new NavItemComponent(Router.pages.main, 'Home'),
      new NavItemComponent(Router.pages.profile, 'Profile'),
      new NavItemComponent(Router.pages.about, 'About'),
      new NavItemComponent(Router.pages.catalog, 'Catalog'),
      new NavItemComponent(Router.pages.cart, 'Cart'),
      new NavItemComponent(Router.pages.login, 'Log in'),
      new NavItemComponent(Router.pages.registration, 'Sign up'),
    ];

    if (isCustomerAuthorized()) {
      const logoutItem = new NavItemComponent(Router.pages.main, 'Logout');
      logoutItem.node.addEventListener('click', (event) => {
        sessionStorage.clear();
        localStorage.clear();
        replaceLocation(Router.pages.main);
        dispatchAuthorizationChangeEvent(false);
        toggleFunction(event);
      });
      menuItems.push(logoutItem);
    } else {
      menuItems.forEach((item) => {
        if (item.text === 'Log in' || item.text === 'Sign up') {
          item.node.addEventListener('click', toggleFunction);
        }
      });
    }

    menuItems.forEach((item) => {
      if (item.text !== 'Logout') {
        item.node.addEventListener('click', toggleFunction);
      }
      ul.node.appendChild(item.node);
    });

    menuContainer.node.appendChild(ul.node);
    this.node.appendChild(menuContainer.node);
  }

  subscribeToAuthorizationChanges(toggleFunction: (event?: Event) => void) {
    subscribeToAuthorizationChangeEvent(() => {
      this.node.innerHTML = '';
      this.renderMenuItems(toggleFunction);
    });
  }
}
