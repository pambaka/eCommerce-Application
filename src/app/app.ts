import Header from '../modules/header/header';
import MainSection from '../pages/main/render/render-main';
import ErrorSection from '../pages/error/render/render-error-page';
import Footer from '../modules/footer/footer';
import Router from '../services/router';

export default class App {
  private header: Header;

  private mainSection: MainSection;

  private errorSection: ErrorSection;

  private footer: Footer;

  private contentNode: HTMLElement;

  constructor() {
    this.header = new Header();
    this.mainSection = new MainSection();
    this.errorSection = new ErrorSection();
    this.footer = new Footer();
    this.contentNode = document.createElement('main');
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupInitialLayout();
      window.addEventListener('hashchange', this.render.bind(this));
      this.render();
    });
  }

  setupInitialLayout() {
    document.body.append(this.header.node, this.contentNode, this.footer.node);
  }

  render() {
    const route = window.location.hash || Router.pages.main;

    this.contentNode.innerHTML = '';

    switch (route) {
      case Router.pages.main:
        this.contentNode.append(this.mainSection.node);
        break;
      case Router.pages.notFound:
        this.contentNode.append(this.errorSection.node);
        break;
      default:
        this.contentNode.append(this.errorSection.node);
    }
  }
}
