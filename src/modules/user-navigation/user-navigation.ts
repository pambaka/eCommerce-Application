import './user-navigation.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import Router from '../../services/router';
import isCustomerAuthorized from '../../utils/is-customer-authorized';
import setLocationHash from '../../utils/set-location-hash';
import ButtonWithSvgIcon from '../../components/button-with-svg-icon';
import userNavIcons from '../../assets/user-nav-icons-sprite.svg';

export default class UserNavigation extends BaseComponent {
  logInButton: ButtonComponent;

  signUpButton: ButtonComponent;

  logOutButton: ButtonComponent;

  constructor() {
    super('nav', 'user-nav');

    this.logInButton = new ButtonWithSvgIcon(
      'login-button',
      () => setLocationHash(Router.pages.login),
      'Log in button',
      `${userNavIcons}#log-in`,
    );

    this.signUpButton = new ButtonWithSvgIcon(
      'signup-button',
      () => setLocationHash(Router.pages.registration),
      'Sign up button',
      `${userNavIcons}#sign-up`,
    );

    this.logOutButton = new ButtonWithSvgIcon(
      'logout-button',
      () => {
        sessionStorage.clear();
        this.updateButtons();
      },
      'Log out button',
      `${userNavIcons}#log-out`,
    );
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
