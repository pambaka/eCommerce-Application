import BaseComponent from '../../../components/base-component';
import { CLASS_NAMES } from '../../../const';
import inputModule from '../../../modules/input-module';

export default function createEmailAndPasswordRow(): HTMLElement {
  const row = new BaseComponent('div', 'row');
  const emailModule = inputModule(CLASS_NAMES.emailInput, 'email', 'E-mail *');
  emailModule.classList.add('col-md-6');
  const passwordModule = inputModule(CLASS_NAMES.passwordInput, 'password', 'Password *');
  passwordModule.classList.add('col-md-6');
  row.node.append(emailModule, passwordModule);

  return row.node;
}
