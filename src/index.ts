import './style.scss';
import Header from './modules/header/header';
import MainSection from './pages/main/render/render-main';
import Footer from './modules/footer/footer';

document.addEventListener('DOMContentLoaded', () => {
  const header = new Header();
  const mainSection = new MainSection();
  const footer = new Footer();

  document.body.append(header.node, mainSection.node, footer.node);
});
