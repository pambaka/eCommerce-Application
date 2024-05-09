import BaseComponent from '../../components/base-component';

export default class Footer extends BaseComponent {
  public container: HTMLElement;

  constructor() {
    super('footer', 'footer');
    this.container = this.node;
    this.renderFooter();
  }

  renderFooter() {
    this.node.innerHTML = `
      <div class="footer_contacts">
        <h2 class="footer_title">Contact Us</h2>
        <ul class="contacts_list">
          <li class="contacts_item">
            <p class="contacts_title">Email</p>
            <a href="mailto:keep_calm_and_code@gmail.com" class="footer_text link">keep_calm_and_code@gmail.com</a>
          </li>
          <li class="contacts_item">
            <p class="contacts_title">Phone number</p>
            <a href="tel:+79995201234" class="footer_text">8-999-520-1234</a>
          </li>
          <li class="contacts_item">
            <p class="contacts_title">Address</p>
            <a class="footer_text link">Lehendakarianen, 5, Bilbo</a>
          </li>
        </ul>
      </div>
      <div class="footer_info">
        <div class="footer_logo">
          <img src="https://www.svgrepo.com/show/530291/leaves-2.svg" alt="logo" class="logo_img" width="50" height="50">
          <h1 class="logo_text">KeepCalm</h1>
        </div>
        <p class="footer_text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel augue at arcu fermentum blandit. In hac habitasse platea dictumst. Pellentesque aliquam dui urna, quis fermentum massa posuere eu. Aliquam vel venenatis lectus, consequat semper risus. Vivamus libero dui, ornare vitae est pharetra, lacinia elementum ligula. Aliquam eget orci et sem posuere blandit eu ac neque. Donec bibendum venenatis ante, in varius velit dapibus at.</p>
        <ul class="info_list">
          <li class="info_item"><a href="" class="info_link"><img src="https://www.svgrepo.com/show/521711/instagram.svg" alt="inst" class="info_icon" width="30" height="30"></a></li>
          <li class="info_item"><a href="" class="info_link"><img src="https://www.svgrepo.com/show/509923/facebook.svg" alt="facebook" class="info_icon" width="30" height="30"></a></li>
          <li class="info_item"><a href="https://rs.school/" class="info_link"><img src="https://rs.school/assets/rs-logo-2XN05XgC.webp" alt="rs logo" class="info_icon" width="30" height="30"></a></li>
        </ul>
      </div>
    `;
  }
}
