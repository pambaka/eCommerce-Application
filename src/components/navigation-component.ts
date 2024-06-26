import BaseComponent from './base-component';
import BaseLinkComponent from './base-link-component';

export default class NavItemComponent extends BaseComponent {
  public text: string;

  constructor(href: string, text: string) {
    super('li', 'nav_item');
    this.text = text;
    const a = new BaseLinkComponent(href, 'nav_link', text);
    this.node.appendChild(a.node);
  }
}
