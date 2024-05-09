import './style.scss';

import Header from './modules/header/header';
import MainSection from './modules/main/main-section';
// import ErrorSection from './modules/error/error404';
import Footer from './modules/footer/footer';

document.addEventListener('DOMContentLoaded', () => {
  const header = new Header();
  document.body.prepend(header.container);

  const mainSection = new MainSection();
  document.body.append(mainSection.container);

  // const errorSection = new ErrorSection();
  // document.body.append(errorSection.container);

  const footer = new Footer();
  document.body.append(footer.container);
});
