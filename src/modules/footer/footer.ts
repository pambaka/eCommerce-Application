import './footer.scss';
import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import ContactItem from '../../components/contact-component';
import SvgImage from '../../components/svg-image';
import logoImgSprite from '../../assets/leaf-sprite.svg';
import LinkImage from '../../components/link-image';
import footerIcon from '../../assets/footer-icons-sprite.svg';

export default class Footer extends BaseComponent {
  constructor() {
    super('footer', 'footer');
    this.renderFooter();
  }

  private renderFooter(): void {
    this.renderContacts();
    this.renderInfo();
  }

  private renderContacts() {
    const contacts = new BaseComponent('div', 'footer_contacts');

    const title = new BaseTextComponent('h2', 'footer_title', 'Contact Us');

    const list = new BaseComponent('ul', 'contacts_list');
    const email = new ContactItem('Email', 'mailto:keep_calm@gmail.com', 'keep_calm@gmail.com').getNode();
    const phone = new ContactItem('Phone number', 'tel:123456789', '123456789').getNode();
    const address = new ContactItem('Address', '#', 'Lehendakarianen, 5, Bilbo').getNode();
    list.node.append(email, phone, address);

    contacts.node.append(title.node, list.node);

    this.node.append(contacts.node);
  }

  private renderInfo() {
    const info = new BaseComponent('div', 'footer_info');

    const logo = new BaseComponent('div', 'footer_logo');
    const logoImg = new SvgImage(`${logoImgSprite}#leaf`, 'footer_logo-img');
    const logoText = new BaseTextComponent('h1', 'logo_text', 'KeepCalm');
    logo.node.append(logoImg.node, logoText.node);

    const text = new BaseTextComponent(
      'p',
      'footer_text',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel augue at arcu fermentum blandit. In hac habitasse platea dictumst. Pellentesque aliquam dui urna, quis fermentum massa posuere eu.',
    );

    const list = new BaseComponent('ul', 'info_list');
    const names = ['pambaka', 'gunsnfnr', 'tmaltseva', 'rss'];
    names.forEach((name) => {
      const item = new BaseComponent('li', 'info_item');
      let image: LinkImage;
      if (name === 'rss') image = new LinkImage('https://rs.school/', `${footerIcon}#rss`);
      else image = new LinkImage(`https://github.com/${name}`, `${footerIcon}#github`);
      item.node.append(image.node);
      list.node.append(item.node);
    });

    info.node.append(logo.node, text.node, list.node);

    this.node.append(info.node);
  }
}
