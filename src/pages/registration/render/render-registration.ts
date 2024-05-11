import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import '../../../styles/registration-page.scss';
import { CLASS_NAMES, DOM } from '../../../const';
import inputModule from '../../../modules/input-module-reg';
import handleSubmit from '../logic/handle-submit';
import renderSelectCountries from './render-select-coutries';
import validateForm from '../../validate-form';

export default function renderRegistration() {
  const form = new BaseComponent('form', CLASS_NAMES.registrationForm);

  const row1 = new BaseComponent('div', 'row-2');
  const emailModule = inputModule(CLASS_NAMES.emailInput, 'email', 'E-mail *');
  const passwordModule = inputModule(CLASS_NAMES.passwordInput, 'password', 'Password *');
  row1.node.append(emailModule, passwordModule);

  const row2 = new BaseComponent('div', 'row-3');
  const firstNameModule = inputModule(CLASS_NAMES.firstName, 'text', 'First name *');
  const lastNameModule = inputModule(CLASS_NAMES.lastName, 'text', 'Last name *');
  row2.node.append(firstNameModule, lastNameModule);

  const birthDateModule = inputModule(CLASS_NAMES.birthDate, 'date', 'Date of birth *');
  const birthDateInput = birthDateModule.querySelector(`.${CLASS_NAMES.birthDate}`);
  if (birthDateInput) {
    birthDateInput.removeEventListener('keyup', validateForm);
    birthDateInput.addEventListener('change', validateForm);
  }
  birthDateModule.style.width = '125px';
  // birthDateModule.style.maxWidth = '120px';
  row2.node.append(birthDateModule);

  const address = new BaseTextComponent('div', CLASS_NAMES.address, 'Address');

  const row4 = new BaseComponent('div', 'row-2');
  const postalCodeModule = inputModule(CLASS_NAMES.postalCode, 'text', 'Postal code *');

  renderSelectCountries(row4.node);
  row4.node.append(postalCodeModule);

  const row5 = new BaseComponent('div', 'row-2');
  const streetModule = inputModule(CLASS_NAMES.street, 'text', 'Street *');
  const cityModule = inputModule(CLASS_NAMES.city, 'text', 'City *');
  row5.node.append(streetModule, cityModule);

  const submitButton = new ButtonComponent(CLASS_NAMES.registrationButton, handleSubmit, 'Submit registration', true);
  DOM.add(CLASS_NAMES.registrationButton, submitButton.node);

  form.node.append(row1.node, row2.node, address.node, row4.node, row5.node, submitButton.node);
  document.body.append(form.node);
}
