import Header from '../modules/header/header';
import MainSection from '../pages/main/render/render-main';
import ErrorSection from '../pages/error/render/render-error-page';
import Footer from '../modules/footer/footer';
import Router from '../services/router';
import renderLoginPage from '../pages/login/render/render-login';
import renderRegistration from '../pages/registration/render/render-registration';
import renderProfilePage from '../pages/profile/render/render-profile';
import isCustomerAuthorized from '../utils/is-customer-authorized';
import replaceLocation from '../utils/replace-location';
import renderCatalog from '../pages/catalog/render/render-catalog';
import renderProduct from '../pages/product/render/render-product';

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
    document.addEventListener('DOMContentLoaded', async () => {
      this.setupInitialLayout();
      await this.registerProductRoutes();
      this.render();
    });
  }

  setupInitialLayout() {
    document.body.append(this.header.node, this.contentNode, this.footer.node);
  }

  registerRoutes() {
    this.router.register(Router.pages.main, () => this.renderMainPage());
    this.router.register(Router.pages.notFound, () => this.renderErrorPage());
    this.router.register(Router.pages.catalog, () => this.renderCatalog());
    this.router.register(Router.pages.login, () => {
      if (!isCustomerAuthorized()) {
        this.renderLogInPage();
      } else {
        replaceLocation(Router.pages.main);
      }
    });
    this.router.register(Router.pages.registration, () => {
      if (!isCustomerAuthorized()) {
        this.renderRegistrationPage();
      } else {
        replaceLocation(Router.pages.main);
      }
    });
    this.router.register(Router.pages.profile, () => {
      if (isCustomerAuthorized()) {
        this.renderProfilePage();
      } else {
        replaceLocation(Router.pages.login);
      }
    });
    // Registration of other routes
  }

  private async registerProductRoutes() {
    await Router.addProductPages();

    Object.keys(Router.productPages).forEach((key) => {
      this.router.register(Router.productPages[key], () => {
        this.prepare();
        renderProduct(key);
      });
    });
  }

  private renderMainPage() {
    this.prepare();
    this.contentNode.append(this.mainSection.node);
  }

  private renderErrorPage() {
    this.prepare();
    this.contentNode.append(this.errorSection.node);
  }

  private async renderCatalog() {
    this.prepare();
    this.contentNode.append(await renderCatalog());
  }

  private renderRegistrationPage() {
    this.prepare();
    this.contentNode.append(renderRegistration());
  }

  private renderLogInPage() {
    this.prepare();
    this.contentNode.append(renderLoginPage());
  }

  private renderProfilePage() {
    this.prepare();
    this.contentNode.append(renderProfilePage());
  }

  render() {
    this.router.onHashChange();
  }

  private prepare() {
    this.updateCurrentPageLink();
    this.contentNode.innerHTML = '';
  }

  private updateCurrentPageLink() {
    const { hash } = window.location;

    const logo = this.header.node.querySelector('.header-logo');
    const links: NodeListOf<HTMLAnchorElement> = this.header.node.querySelectorAll('.nav_link');

    if (logo && hash === Router.pages.main) {
      logo.classList.add('header-logo--active');

      links.forEach((link) => {
        link.classList.remove('nav-link--active');
      });
    } else {
      links.forEach((link) => {
        const startIndex = link.href.indexOf('#');
        const linkHash = link.href.slice(startIndex);

        if (linkHash === hash) link.classList.add('nav-link--active');
        else link.classList.remove('nav-link--active');
      });

      if (logo) logo.classList.remove('header-logo--active');
    }
  }
}
