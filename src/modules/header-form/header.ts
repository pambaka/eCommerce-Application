import './header.scss';
import BaseComponent from '../../components/base-component';
import ButtonComponent from '../../components/button-component';
import renderRegistration from '../../pages/registration/render/render-registration';
import renderLoginPage from '../../pages/login/render/render-login';

export default class Header extends BaseComponent {
  constructor() {
    super('header');
  }

  //   renderLogo() {}

  //   renderNavPanel() {}

  renderUserNavPanel(buttonsNames: ('login' | 'register')[]) {
    const userNavPanel = new BaseComponent('nav', 'user-nav');
    let loginButton: ButtonComponent | undefined;
    let signUpButton: ButtonComponent | undefined;

    const buttons: ButtonComponent[] = [];

    buttonsNames.forEach((name) => {
      switch (name) {
        case 'login':
          loginButton = new ButtonComponent('logIn-button', renderLoginPage, 'log in', false);
          buttons.push(loginButton);
          break;
        case 'register':
          signUpButton = new ButtonComponent(
            'register-button',
            () => {
              document.body.innerHTML = '';
              const header = new Header();
              header.renderUserNavPanel(['login']);
              document.body.append(header.node);
              renderRegistration();
            },
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
