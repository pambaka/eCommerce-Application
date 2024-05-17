import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import '../../../styles/registration-page.scss';
import { CLASS_NAMES, DOM } from '../../../const';
import inputModule from '../../../modules/input-module';
import handleSubmitRegistration from '../logic/handle-submit';
import createAddressBlock from './create-address-block';

export default function renderRegistration(): HTMLElement {
  const form = new BaseComponent('form', CLASS_NAMES.registrationForm);
  form.node.classList.add('container');

  const row1 = new BaseComponent('div', 'row');
  const emailModule = inputModule(CLASS_NAMES.emailInput, 'email', 'E-mail *');
  emailModule.classList.add('col-md-6');
  const passwordModule = inputModule(CLASS_NAMES.passwordInput, 'password', 'Password *');
  passwordModule.classList.add('col-md-6');
  row1.node.append(emailModule, passwordModule);

  const row2 = new BaseComponent('div', 'row');
  const firstNameModule = inputModule(CLASS_NAMES.firstName, 'text', 'First name *');
  firstNameModule.classList.add('col-md-4');
  const lastNameModule = inputModule(CLASS_NAMES.lastName, 'text', 'Last name *');
  lastNameModule.classList.add('col-md-5');
  const birthDateModule = inputModule(CLASS_NAMES.birthDate, 'date', 'Date of birth *');
  birthDateModule.classList.add('col-md-3');
  row2.node.append(firstNameModule, lastNameModule, birthDateModule);

  const addressBlock = createAddressBlock();

  const submitButton = new ButtonComponent(CLASS_NAMES.registrationButton, handleSubmitRegistration, 'Register', true);
  submitButton.node.classList.add('d-grid', 'col-6', 'mt-4', 'mx-auto');
  DOM.add(CLASS_NAMES.registrationButton, submitButton.node);

  form.node.append(row1.node, row2.node, addressBlock, submitButton.node);
  return form.node;
}
