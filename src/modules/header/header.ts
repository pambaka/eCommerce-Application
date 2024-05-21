import './header.scss';
import BaseComponent from '../../components/base-component';
import NavItemComponent from '../../components/navigation-component';
import BaseLinkComponent from '../../components/base-link-component';
import BurgerMenuButton from '../../components/burger-menu-component';
import BurgerMenuIcon from '../../components/burger-menu-icon';
import SideMenuComponent from '../../components/side-menu-component';
import UserNavigation from '../user-navigation/user-navigation';
import Router from '../../services/router';
import SvgImage from '../../components/svg-image';
import sprite from '../../assets/leaf-sprite.svg';

export default class Header extends BaseComponent {
  private burgerMenuIcon: BurgerMenuButton | null = null;

  private sideMenu: SideMenuComponent;

  constructor() {
    super('header', 'header');
    this.sideMenu = new SideMenuComponent(this.toggleNavigation.bind(this));
    this.node.append(this.sideMenu.node);
    this.renderHeader();
  }

  private renderHeader() {
    const logoLink = new BaseLinkComponent(Router.pages.main, '', '');
    const logo = new SvgImage(`${sprite}#leaf`, 'header-logo');
    logoLink.node.append(logo.node);

    // Navigation items
    const nav = new BaseComponent('nav', 'main_navigation');
    const ul = new BaseComponent('ul', 'nav-list');
    ul.node.append(new NavItemComponent(Router.pages.about, 'About').node);
    ul.node.append(new NavItemComponent(Router.pages.catalog, 'Catalog').node);
    ul.node.append(new NavItemComponent(Router.pages.login, 'Log in').node);
    ul.node.append(new NavItemComponent(Router.pages.registration, 'Sign up').node);

    // Burger icon
    const burgerMenuButton = new BurgerMenuButton('burger-menu-wrapper', this.toggleNavigation.bind(this));
    burgerMenuButton.node.classList.add('hidden');
    this.burgerMenuIcon = new BurgerMenuIcon('burger-menu');
    burgerMenuButton.node.append(this.burgerMenuIcon.node);
    ul.node.append(burgerMenuButton.node);

    nav.node.append(ul.node);

    // User menu
    const userNavigation = new UserNavigation();
    userNavigation.renderButtons();

    this.node.append(logoLink.node, nav.node, userNavigation.node);
  }

  toggleNavigation(event?: Event) {
    if (!(event?.target instanceof HTMLAnchorElement)) {
      event?.preventDefault();
    }
    this.sideMenu.node.classList.toggle('hidden');
    this.burgerMenuIcon!.node.classList.toggle('cross');
  }
}
