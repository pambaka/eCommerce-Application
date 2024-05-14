import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import BaseImageComponent from '../../components/base-image-component';
import BaseLinkComponent from '../../components/base-link-component';

export default class Footer extends BaseComponent {
  constructor() {
    super('footer', 'footer');
    this.renderFooter();
  }

  static addContactItem(parentNode: HTMLElement, titleText: string, href: string, linkText: string): void {
    const item = new BaseComponent('li', 'contacts_item');
    const title = new BaseTextComponent('p', 'contacts_title', titleText);
    const link = new BaseLinkComponent(href, 'footer_text link', linkText);
    item.node.appendChild(title.node);
    item.node.appendChild(link.node);
    parentNode.appendChild(item.node);
  }

  private renderFooter(): void {
    const contactsDiv = new BaseComponent('div', 'footer_contacts');
    const contactsTitle = new BaseTextComponent('h2', 'footer_title', 'Contact Us');
    const contactsList = new BaseComponent('ul', 'contacts_list');

    Footer.addContactItem(
      contactsList.node,
      'Email',
      'mailto:keep_calm_and_code@gmail.com',
      'keep_calm_and_code@gmail.com',
    );
    Footer.addContactItem(contactsList.node, 'Phone number', 'tel:+79995201234', '8-999-520-1234');
    Footer.addContactItem(contactsList.node, 'Address', '#', 'Lehendakarianen, 5, Bilbo');

    contactsDiv.node.appendChild(contactsTitle.node);
    contactsDiv.node.appendChild(contactsList.node);

    const infoDiv = new BaseComponent('div', 'footer_info');
    const logoDiv = new BaseComponent('div', 'footer_logo');
    const logoImg = new BaseImageComponent(
      'footer_logo-img',
      'https://www.svgrepo.com/show/530291/leaves-2.svg',
      'logo',
    );
    const logoText = new BaseTextComponent('h1', 'logo_text', 'KeepCalm');
    const footerText = new BaseTextComponent(
      'p',
      'footer_text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel augue at arcu fermentum blandit. In hac habitasse platea dictumst. Pellentesque aliquam dui urna, quis fermentum massa posuere eu. Aliquam vel venenatis lectus, consequat semper risus. Vivamus libero dui, ornare vitae est pharetra, lacinia elementum ligula. Aliquam eget orci et sem posuere blandit eu ac neque. Donec bibendum venenatis ante, in varius velit dapibus at.',
    );
    const infoList = new BaseComponent('ul', 'info_list');

    const addSocialIcon = (href: string, src: string, alt: string) => {
      const item = new BaseComponent('li', 'info_item');
      const link = new BaseLinkComponent(href, 'info_link', '');
      const icon = new BaseImageComponent('info_icon', src, alt);
      link.node.appendChild(icon.node);
      item.node.appendChild(link.node);
      infoList.node.appendChild(item.node);
    };

    addSocialIcon('#', 'https://www.svgrepo.com/show/521711/instagram.svg', 'Instagram');
    addSocialIcon('#', 'https://www.svgrepo.com/show/509923/facebook.svg', 'Facebook');
    addSocialIcon('https://rs.school/', 'https://rs.school/assets/rs-logo-2XN05XgC.webp', 'RS School logo');

    logoDiv.node.append(logoImg.node, logoText.node);
    infoDiv.node.append(logoDiv.node, footerText.node, infoList.node);

    this.node.appendChild(contactsDiv.node);
    this.node.appendChild(infoDiv.node);
  }
}
