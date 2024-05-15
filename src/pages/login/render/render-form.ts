import BaseComponent from '../../../components/base-component';
import inputModule from '../../../modules/input-module';
import { CLASS_NAMES, DOM } from '../../../const';
import LabelComponent from '../../../components/label-component';
import togglePasswordVisibility from '../logic/toggle-password-visibility';
import ButtonComponent from '../../../components/button-component';
import handleLoginRequest from '../logic/handle-login-request';

export default function renderForm(parentElement: HTMLElement): void {
  const loginForm = new BaseComponent<HTMLFormElement>('form', 'login-form');

  const inputLogin: HTMLDivElement = inputModule(CLASS_NAMES.loginLogin, 'email', 'Login (e-mail) *');
  const inputPassword: HTMLDivElement = inputModule(CLASS_NAMES.loginPassword, 'password', 'Password *');

  const checkboxLabel = new LabelComponent('Show password');
  checkboxLabel.node.classList.add('password-checkbox__label');

  const passwordCheckbox = new BaseComponent<HTMLInputElement>('input');
  passwordCheckbox.node.type = 'checkbox';
  passwordCheckbox.node.addEventListener('click', togglePasswordVisibility);

  checkboxLabel.node.prepend(passwordCheckbox.node);
  inputPassword.append(checkboxLabel.node);

  const button = new ButtonComponent(CLASS_NAMES.loginButton, handleLoginRequest, 'login', true);
  DOM.add(CLASS_NAMES.loginButton, button.node);

  loginForm.node.append(inputLogin, inputPassword, button.node);

  parentElement.append(loginForm.node);
}
