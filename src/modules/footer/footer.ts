import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import BaseImageComponent from '../../components/base-image-component';
import BaseLinkComponent from '../../components/base-link-component';
import ContactItem from '../../components/contact-component';

export default class Footer extends BaseComponent {
  constructor() {
    super('footer', 'footer');
    this.renderFooter();
  }

  private renderFooter(): void {
    const contactsDiv = new BaseComponent('div', 'footer_contacts');
    const contactsTitle = new BaseTextComponent('h2', 'footer_title', 'Contact Us');
    const contactsList = new BaseComponent('ul', 'contacts_list');

    const emailContact = new ContactItem('Email', 'mailto:keep_calm@gmail.com', 'keep_calm@gmail.com').getNode();
    const phoneContact = new ContactItem('Phone number', 'tel:+79995201234', '8-999-520-1234').getNode();
    const addressContact = new ContactItem('Address', '#', 'Lehendakarianen, 5, Bilbo').getNode();

    contactsList.node.append(emailContact, phoneContact, addressContact);

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
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel augue at arcu fermentum blandit. In hac habitasse platea dictumst. Pellentesque aliquam dui urna, quis fermentum massa posuere eu.',
    );
    footerText.node.classList.add('footer_description');
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
