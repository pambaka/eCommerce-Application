import './style.scss';

import Header from './modules/header/header';
import MainSection from './pages/main/render/render-main';
import ErrorSection from './pages/error/render/render-error-page';
import Footer from './modules/footer/footer';
import Router from './services/router';

class App {
  private header: Header;

  private mainSection: MainSection;

  private errorSection: ErrorSection;

  private footer: Footer;

  constructor() {
    this.header = new Header();
    this.mainSection = new MainSection();
    this.errorSection = new ErrorSection();
    this.footer = new Footer();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      window.addEventListener('hashchange', this.render.bind(this));
      this.render();
    });
  }

  render() {
    const route = window.location.hash || Router.pages.main;

    document.body.innerHTML = '';
    document.body.prepend(this.header.node);

    switch (route) {
      case Router.pages.main:
        document.body.append(this.mainSection.node);
        break;
      case Router.pages.notFound:
        document.body.append(this.errorSection.node);
        break;
      default:
        document.body.append(this.errorSection.node);
    }

    document.body.append(this.footer.node);
  }
}

const app = new App();
app.init();
