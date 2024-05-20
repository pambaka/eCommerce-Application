import './user-navigation.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import Router from '../../services/router';
import isCustomerAuthorized from '../../utils/is-customer-authorized';
import setLocationHash from '../../utils/set-location-hash';
import ButtonWithSvgIcon from '../../components/button-with-svg-icon';
import userNavIcons from '../../assets/user-nav-icons-sprite.svg';
import { subscribeToAuthorizationChangeEvent, dispatchAuthorizationChangeEvent } from '../../utils/authorization-event';

export default class UserNavigation extends BaseComponent {
  logInButton: ButtonComponent;

  signUpButton: ButtonComponent;

  logOutButton: ButtonComponent;

  constructor() {
    super('nav', 'user-nav');

    this.logInButton = new ButtonWithSvgIcon(
      'login-button',
      () => {
        setLocationHash(Router.pages.login);
        // this.updateButtons();
      },
      'Log in button',
      'log in',
      `${userNavIcons}#log-in`,
    );

    this.signUpButton = new ButtonWithSvgIcon(
      'signup-button',
      () => {
        setLocationHash(Router.pages.registration);
        // this.updateButtons();
      },
      'Sign up button',
      'register',
      `${userNavIcons}#sign-up`,
    );

    this.logOutButton = new ButtonWithSvgIcon(
      'logout-button',
      () => {
        sessionStorage.clear();
        dispatchAuthorizationChangeEvent(false);
        this.updateButtons();
      },
      'Log out button',
      'log out',
      `${userNavIcons}#log-out`,
    );

    this.subscribeToAuthorizationChanges();
  }

  renderButtons() {
    // const { hash } = window.location;

    if (isCustomerAuthorized()) this.node.append(this.logOutButton.node);
    // else if (hash === Router.pages.login) this.node.append(this.signUpButton.node);
    // else if (hash === Router.pages.registration) this.node.append(this.logInButton.node);
    else this.node.append(this.logInButton.node, this.signUpButton.node);
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
