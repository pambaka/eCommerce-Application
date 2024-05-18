import '../../../styles/login-page.scss';
import Header from '../../../modules/header-form/header';
import renderForm from './render-form';
import BaseComponent from '../../../components/base-component';

export default function renderLoginPage(): HTMLElement {
  const pageContainer = document.createElement('div');

  const header = new Header();
  header.renderLogo();
  header.renderUserNavPanel(['register']);

  const main = new BaseComponent('main', 'main-login');
  renderForm(main.node);

  pageContainer.append(header.node, main.node);

  return pageContainer;
}
