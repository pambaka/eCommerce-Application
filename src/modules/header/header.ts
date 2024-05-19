import BaseComponent from '../../components/base-component';
import NavItemComponent from '../../components/navigation-component';
import BaseImageComponent from '../../components/base-image-component';
import BaseLinkComponent from '../../components/base-link-component';
import BurgerMenuButton from '../../components/burger-menu-component';
import BurgerMenuIcon from '../../components/burger-menu-icon';
import SideMenuComponent from '../../components/side-menu-component';
import Router from '../../services/router';
import SvgImage from '../../components/svg-image';
import sprite from '../../assets/leaf-sprite.svg';
import UserNavigation from '../user-navigation/user-navigation';

export default class Header extends BaseComponent {
  private burgerMenuIcon: BurgerMenuButton | null = null;

  private sideMenu: SideMenuComponent;

  private userNavigation: UserNavigation;

  constructor() {
    super('header', 'header');
    this.userNavigation = new UserNavigation();
    this.sideMenu = new SideMenuComponent(this.toggleNavigation.bind(this));
    this.node.appendChild(this.sideMenu.node);
    this.renderHeader();
  }

  renderHeader() {
    const nav = new BaseComponent('nav', 'main_navigation');
    const ul = new BaseComponent('ul', 'nav');
    ul.node.classList.add('nav_header');

    const logoItem = new BaseComponent('li', 'nav_item');
    const logoLink = new BaseLinkComponent(Router.pages.main, 'header_logo', '');

    const logo = new SvgImage(`${sprite}#leaf`, 'header-logo');
    logoLink.node.appendChild(logo.node);

    logoItem.node.appendChild(logoLink.node);
    ul.node.appendChild(logoItem.node);

    // Navigation items
    ul.node.appendChild(new NavItemComponent(Router.pages.main, 'Home').node);
    ul.node.appendChild(new NavItemComponent(Router.pages.about, 'About').node);
    ul.node.appendChild(new NavItemComponent(Router.pages.catalog, 'Catalog').node);
    ul.node.appendChild(new NavItemComponent(Router.pages.login, 'Log in').node);
    ul.node.appendChild(new NavItemComponent(Router.pages.registration, 'Sign up').node);

    // Cart icon
    const cartItem = new BaseComponent('li', 'nav_item');
    cartItem.node.classList.add('nav_item_cart');
    const cartLink = new BaseLinkComponent(Router.pages.cart, 'nav_link', '');
    const cartIcon = new BaseImageComponent('cart_icon', 'https://www.svgrepo.com/show/529445/cart-3.svg', 'cart');
    cartIcon.node.classList.add('cart');
    cartLink.node.appendChild(cartIcon.node);
    cartItem.node.appendChild(cartLink.node);
    ul.node.appendChild(cartItem.node);

    // Burger icon
    const burgerMenuButton = new BurgerMenuButton('burger-menu-wrapper', this.toggleNavigation.bind(this));
    burgerMenuButton.node.classList.add('hidden');
    this.burgerMenuIcon = new BurgerMenuIcon('burger-menu');
    burgerMenuButton.node.appendChild(this.burgerMenuIcon.node);
    ul.node.appendChild(burgerMenuButton.node);

    nav.node.appendChild(ul.node);
    this.node.appendChild(nav.node);

    // User menu
    this.userNavigation.renderButtons();
    this.node.appendChild(this.userNavigation.node);
  }

  toggleNavigation(event?: Event) {
    if (!(event?.target instanceof HTMLAnchorElement)) {
      event?.preventDefault();
    }
    this.sideMenu.node.classList.toggle('hidden');
    this.burgerMenuIcon!.node.classList.toggle('cross');
  }
}
