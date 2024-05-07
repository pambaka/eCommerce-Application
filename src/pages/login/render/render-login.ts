import '../../../styles/login-page.scss';
import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import inputModule from '../../../modules/input-module';
import { CLASS_NAMES } from '../../../const';

export default function renderLoginPage() {
  const loginForm = new BaseComponent<HTMLFormElement>('form', 'login-form');

  const inputLogin: HTMLDivElement = inputModule(CLASS_NAMES.loginLogin, 'email', 'login (e-mail):');
  const inputPassword: HTMLDivElement = inputModule(CLASS_NAMES.loginPassword, 'password', 'password:');

  const button = new ButtonComponent('login-button', () => console.log('click'), 'login', true);

  loginForm.node.append(inputLogin, inputPassword, button.node);
  document.body.append(loginForm.node);
}
