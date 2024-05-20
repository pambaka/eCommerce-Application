import '../../../styles/login-page.scss';
import renderForm from './render-form';
import BaseComponent from '../../../components/base-component';

export default function renderLoginPage(): HTMLElement {
  const wrapper = new BaseComponent('div', 'form-wrapper');
  renderForm(wrapper.node);

  return wrapper.node;
}
