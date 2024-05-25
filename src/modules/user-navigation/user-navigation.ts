import './user-navigation.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import Router from '../../services/router';
import isCustomerAuthorized from '../../utils/is-customer-authorized';
import replaceLocation from '../../utils/replace-location';
import ButtonWithSvgIcon from '../../components/button-with-svg-icon';
import userNavIcons from '../../assets/user-nav-icons-sprite.svg';
import { subscribeToAuthorizationChangeEvent, dispatchAuthorizationChangeEvent } from '../../utils/authorization-event';

export default class UserNavigation extends BaseComponent {
  logInButton: ButtonComponent;

  signUpButton: ButtonComponent;

  logOutButton: ButtonComponent;

  userProfileButton: ButtonComponent;

  constructor() {
    super('nav', 'user-nav');

    this.logInButton = new ButtonWithSvgIcon(
      'login-button',
      () => {
        replaceLocation(Router.pages.login);
        // this.updateButtons();
      },
      'Log in button',
      'log in',
      `${userNavIcons}#log-in`,
    );

    this.signUpButton = new ButtonWithSvgIcon(
      'signup-button',
      () => {
        replaceLocation(Router.pages.registration);
        // this.updateButtons();
      },
      'Sign up button',
      'register',
      `${userNavIcons}#sign-up`,
    );

    this.logOutButton = new ButtonWithSvgIcon(
      'logout-button',
      () => {
        replaceLocation(Router.pages.main);
        sessionStorage.clear();
        localStorage.clear();
        dispatchAuthorizationChangeEvent(false);
        this.updateButtons();
      },
      'Log out button',
      'log out',
      `${userNavIcons}#log-out`,
    );

    this.userProfileButton = new ButtonWithSvgIcon(
      'user-profile',
      () => {
        replaceLocation(Router.pages.profile);
        dispatchAuthorizationChangeEvent(false);
        this.updateButtons();
      },
      'User profile button',
      'user profile',
      `${userNavIcons}#user-profile`,
    );

    this.subscribeToAuthorizationChanges();
  }

  renderButtons() {
    // const { hash } = window.location;

    if (isCustomerAuthorized()) this.node.append(this.userProfileButton.node, this.logOutButton.node);
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
