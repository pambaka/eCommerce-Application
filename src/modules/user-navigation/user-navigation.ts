import './user-navigation.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import Router from '../../services/router';
import isCustomerAuthorized from '../../utils/is-customer-authorized';
import setLocationHash from '../../utils/set-location-hash';
import { subscribeToAuthorizationChangeEvent, dispatchAuthorizationChangeEvent } from '../../utils/authorization-event';

export default class UserNavigation extends BaseComponent {
  loginButton: ButtonComponent;

  signUpButton: ButtonComponent;

  logoutButton: ButtonComponent;

  constructor() {
    super('nav', 'user-nav');

    this.loginButton = new ButtonComponent('login-button', () => setLocationHash(Router.pages.login), 'log in', false);

    this.signUpButton = new ButtonComponent(
      'register-button',
      () => setLocationHash(Router.pages.registration),
      'sign up',
      false,
    );

    this.logoutButton = new ButtonComponent(
      'logout-button',
      () => {
        sessionStorage.clear();
        dispatchAuthorizationChangeEvent(false);
        this.updateButtons();
      },
      'log out',
      false,
    );

    this.subscribeToAuthorizationChanges();
  }

  renderButtons() {
    this.node.innerHTML = '';

    if (isCustomerAuthorized()) {
      this.node.append(this.logoutButton.node);
    } else {
      this.node.append(this.loginButton.node, this.signUpButton.node);
    }
  }

  updateButtons() {
    this.node.innerHTML = '';
    this.renderButtons();
  }


  subscribeToAuthorizationChanges() {
    subscribeToAuthorizationChangeEvent(() => {
      this.updateButtons();
    });
  }
}
