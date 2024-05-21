export default class Router {
  private routes: Record<string, () => void>;

  public static pages = {
    main: '#main',
    about: '#about',
    catalog: '#catalog',
    login: '#login',
    registration: '#registration',
    profile: '#profile',
    notFound: '#404',
    cart: '#cart',
  };

  constructor() {
    this.routes = {};
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
  }

  onHashChange() {
    const hash = window.location.hash || Router.pages.main;
    const route = this.routes[hash] || this.routes[Router.pages.notFound];
    route();
  }

  register(hash: string, page: () => void) {
    this.routes[hash] = page;
  }
}
