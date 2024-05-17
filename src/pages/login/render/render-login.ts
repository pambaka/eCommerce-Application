import '../../../styles/login-page.scss';
import Header from '../../../modules/header-form/header';
import renderForm from './render-form';
import BaseComponent from '../../../components/base-component';

export default function renderLoginPage(): void {
  document.body.innerHTML = '';

  const header = new Header();
  header.renderLogo();
  header.renderUserNavPanel(['register']);

  const main = new BaseComponent('main', 'main-login');
  renderForm(main.node);

  document.body.append(header.node, main.node);
}
