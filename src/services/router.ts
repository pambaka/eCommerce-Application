export default class Router {
  private routes: Record<string, () => void>;

  public static pages = {
    main: '#main',
    about: '#about',
    catalog: '#catalog',
    login: '#login',
    signup: '#signup',
    profile: '#profile',
    notFound: '#404',
    cart: '#cart',
  };

  constructor() {
    this.routes = {
      '#main': () => console.log('Main page'),
      '#about': () => console.log('About'),
      '#catalog': () => console.log('Catalog'),
      '#login': () => console.log('Log in'),
      '#signup': () => console.log('Sign up'),
      '#profile': () => console.log('Profile'),
      '#404': () => console.log('Not found'),
      '#cart': () => console.log('Cart'),
    };
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));
  }

  onHashChange() {
    const hash = window.location.hash || '#main';
    const route = this.routes[hash] || this.routes['#404'];
    route();
  }

  register(hash: string, page: () => void) {
    this.routes[hash] = page;
  }
}
