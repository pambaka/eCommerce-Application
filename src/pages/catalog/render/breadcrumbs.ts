import BaseComponent from '../../../components/base-component';
import BaseLinkComponent from '../../../components/base-link-component';
import Router from '../../../services/router';
import { BREADCRUMBS_NAMES } from '../const';

export default class Breadcrumbs {
  static node = new BaseComponent('div', 'breadcrumbs').node;

  private static links: HTMLAnchorElement[] = [];

  static async init() {
    this.node.innerHTML = '';
    this.links.length = 0;

    const home = new BaseLinkComponent(Router.pages.main, '', 'Home');
    const catalog = new BaseLinkComponent(Router.pages.catalog, '', 'Catalog');

    this.links.push(home.node, catalog.node);

    this.renderLinks();
  }

  static update() {
    const { hash } = window.location;
    const nestingLevels = hash.split('/');

    if (nestingLevels.length === this.links.length) Breadcrumbs.add(hash, nestingLevels[nestingLevels.length - 1]);
  }

  private static add(hash: string, key: string) {
    const newLink = new BaseLinkComponent(hash, '', BREADCRUMBS_NAMES[key]);
    this.links.push(newLink.node);

    this.renderLinks();
  }

  private static renderLinks() {
    this.links.forEach((link) => {
      this.node.append(link);
    });
  }
}
