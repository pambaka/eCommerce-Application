import Header from '../modules/header/header';
import MainSection from '../pages/main/render/render-main';
import ErrorSection from '../pages/error/render/render-error-page';
import Footer from '../modules/footer/footer';
import Router from '../services/router';
import renderLoginPage from '../pages/login/render/render-login';
import renderRegistration from '../pages/registration/render/render-registration';

export default class App {
  private header: Header;

  private mainSection: MainSection;

  private errorSection: ErrorSection;

  private footer: Footer;

  private contentNode: HTMLElement;

  private router: Router;

  constructor() {
    this.header = new Header();
    this.mainSection = new MainSection();
    this.errorSection = new ErrorSection();
    this.footer = new Footer();
    this.contentNode = document.createElement('main');
    this.router = new Router();
    this.registerRoutes();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupInitialLayout();
      this.render();
    });
  }

  setupInitialLayout() {
    document.body.append(this.header.node, this.contentNode, this.footer.node);
  }

  registerRoutes() {
    this.router.register(Router.pages.main, () => this.renderMainPage());
    this.router.register(Router.pages.notFound, () => this.renderErrorPage());
    this.router.register(Router.pages.login, () => {
      if (!sessionStorage.getItem('isCustomerAuthorized')) {
        renderLoginPage();
      } else {
        window.location.hash = 'main';
        this.renderMainPage();
      }
    });
    this.router.register(Router.pages.registration, () => {
      if (!sessionStorage.getItem('isCustomerAuthorized')) {
        this.renderRegistrationPage();
      } else {
        window.location.hash = 'main';
        this.renderMainPage();
      }
    });
    // Registration of other routes
  }

  private renderMainPage() {
    this.contentNode.innerHTML = '';
    this.contentNode.append(this.mainSection.node);
  }

  private renderErrorPage() {
    this.contentNode.innerHTML = '';
    this.contentNode.append(this.errorSection.node);
  }

  private renderRegistrationPage() {
    this.contentNode.innerHTML = '';
    this.contentNode.append(renderRegistration());
  }

  render() {
    this.router.onHashChange();
  }
}
