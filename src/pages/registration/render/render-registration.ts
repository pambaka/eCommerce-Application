import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import '../../../styles/registration-page.scss';
import { CLASS_NAMES, DOM } from '../../../const';
import handleSubmitRegistration from '../logic/handle-submit';
import createAddressBlock from './create-address-block';
import createEmailAndPasswordRow from './create-email-and-password-row';
import createPersonalDataRow from './create-personal-data-row';
import checkboxes from './create-checkboxes-for-address-block';

export default function renderRegistration(): HTMLElement {
  const form = new BaseComponent('form', CLASS_NAMES.registrationForm);
  form.node.classList.add('container');

  const emailAndPassword = createEmailAndPasswordRow();
  const personalData = createPersonalDataRow();
  const addressBlock = createAddressBlock(CLASS_NAMES.address, 'Shipping address');

  const checkboxesForAddress = checkboxes();

  addressBlock.append(checkboxesForAddress);

  const submitButton = new ButtonComponent(CLASS_NAMES.registrationButton, handleSubmitRegistration, 'Register', true);
  submitButton.node.classList.add('d-grid', 'col-6', 'mt-4', 'mx-auto');
  DOM.add(CLASS_NAMES.registrationButton, submitButton.node);

  form.node.append(emailAndPassword, personalData, addressBlock, submitButton.node);

  return form.node;
}
