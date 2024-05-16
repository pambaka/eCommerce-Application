import './header.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import setLocationHash from '../../utils/set-location-hash';
import Router from '../../services/router';
import SvgImage from '../../components/svg-image';
import BaseLinkComponent from '../../components/base-link-component';
import sprite from '../../assets/leaf-sprite.svg';

export default class Header extends BaseComponent {
  constructor() {
    super('header');
  }

  renderLogo() {
    const link = new BaseLinkComponent(Router.pages.main, '', '');
    const logo = new SvgImage(`${sprite}#leaf`, 'header-logo');
    link.node.append(logo.node);

    this.node.append(link.node);
  }

  // TODO: renderNavPanel() {}

  renderUserNavPanel(buttonsNames: ('login' | 'register')[]) {
    const userNavPanel = new BaseComponent('nav', 'user-nav');
    let loginButton: ButtonComponent | undefined;
    let signUpButton: ButtonComponent | undefined;

    const buttons: ButtonComponent[] = [];

    buttonsNames.forEach((name) => {
      switch (name) {
        case 'login':
          loginButton = new ButtonComponent('logIn-button', () => setLocationHash(Router.pages.login), 'log in', false);
          buttons.push(loginButton);
          break;
        case 'register':
          signUpButton = new ButtonComponent(
            'register-button',
            () => setLocationHash(Router.pages.registration),
            'register',
            false,
          );
          buttons.push(signUpButton);
          break;
        default:
          break;
      }
    });

    buttons.forEach((button) => {
      if (button) userNavPanel.node.append(button.node);
    });

    this.node.append(userNavPanel.node);
  }
}
