import BaseComponent from './base-component';

export default class BaseLinkComponent extends BaseComponent<HTMLAnchorElement> {
  constructor(href: string, className: string, text: string) {
    super('a', className);
    this.node.setAttribute('href', href);
    this.node.textContent = text;
  }
}
