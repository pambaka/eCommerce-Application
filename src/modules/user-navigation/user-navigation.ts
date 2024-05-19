import './user-navigation.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import Router from '../../services/router';
import isCustomerAuthorized from '../../utils/is-customer-authorized';
import setLocationHash from '../../utils/set-location-hash';

export default class UserNavigation extends BaseComponent {
  logInButton: ButtonComponent;

  signUpButton: ButtonComponent;

  logOutButton: ButtonComponent;

  constructor() {
    super('nav', 'user-nav');

    this.logInButton = new ButtonComponent('login-button', () => setLocationHash(Router.pages.login), '', false);
    this.logInButton.node.ariaLabel = 'Log in';
    this.logInButton.node.title = 'log IN';

    this.signUpButton = new ButtonComponent(
      'signup-button',
      () => setLocationHash(Router.pages.registration),
      '',
      false,
    );
    this.signUpButton.node.ariaLabel = 'Sign in';
    this.signUpButton.node.title = 'register';

    this.logOutButton = new ButtonComponent(
      'logout-button',
      () => {
        sessionStorage.clear();
        this.updateButtons();
      },
      '',
      false,
    );
    this.logOutButton.node.ariaLabel = 'Log out';
    this.logOutButton.node.title = 'log OUT';
  }

  renderButtons() {
    const { hash } = window.location;

    if (isCustomerAuthorized()) this.node.append(this.logOutButton.node);
    else if (hash === Router.pages.login) this.node.append(this.signUpButton.node);
    else if (hash === Router.pages.registration) this.node.append(this.logInButton.node);
    else this.node.append(this.logInButton.node, this.signUpButton.node);
  }

  updateButtons() {
    this.node.innerHTML = '';
    this.renderButtons();
  }
}
