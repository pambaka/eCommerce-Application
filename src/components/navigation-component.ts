import BaseComponent from './base-component';

export default class NavItemComponent extends BaseComponent {
  constructor(href: string, text: string) {
    super('li', 'nav_item');
    const a = document.createElement('a');
    a.setAttribute('href', href);
    a.textContent = text;
    a.classList.add('nav_link');
    this.node.appendChild(a);
  }
}
