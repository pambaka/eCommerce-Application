import BaseComponent from './base-component';
import BaseTextComponent from './base-text-component';
import BaseLinkComponent from './base-link-component';

export default class ContactItem extends BaseComponent {
  constructor(titleText: string, href: string, linkText: string) {
    super('li', 'contacts_item');

    const title = new BaseTextComponent('p', 'contacts_title', titleText);
    const link = new BaseLinkComponent(href, 'link', linkText);
    link.node.classList.add('footer_text');

    this.node.append(title.node, link.node);
  }

  getNode() {
    return this.node;
  }
}
