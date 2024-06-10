import BaseTextComponent from '../components/base-text-component';
import BaseComponent from '../components/base-component';
import BaseImageComponent from '../components/base-image-component';

export default class PromoCodeComponent extends BaseComponent {
  private imageContainer!: BaseComponent;

  private textContainer!: BaseComponent;

  private currentImageIndex: number;

  private images: string[];

  constructor() {
    super('div', 'promo_code_container');
    this.currentImageIndex = 0;
    this.images = [
      'https://img.freepik.com/free-photo/pretty-boy-playing-with-wooden-cubes-home_155003-35544.jpg?t=st=1718019111~exp=1718022711~hmac=6890fa4f000c642471f7e506bd59088cac443856b7c3f4b326b44b7d56622504&w=1800',
      'https://img.freepik.com/free-photo/close-up-children-enjoying-didactic-game_23-2149316942.jpg?t=st=1718026950~exp=1718030550~hmac=ec5a4f23216fc96f838c15ced1043aa6e88c83829f75f2887214f2c081d80bec&w=1800',
      'https://img.freepik.com/free-photo/front-view-girl-playing-memory-game_23-2150231754.jpg?t=st=1718019189~exp=1718022789~hmac=e5bd234594759eca6bfbc070a6c506536ee19c1e91b10272577e9ecbad7bcbc8&w=1800',
      'https://bunnyhill.ru/upload/iblock/55b/ox8kfnbm24gm7nbw1c471qbq7pwuao9c/%D0%B3%D0%BB%D0%B0%D0%B2.jpg',
    ];
    this.renderPromoCode();
    this.startImageRotation();
  }

  renderPromoCode() {
    this.textContainer = new BaseComponent('div', 'text_container');
    this.node.appendChild(this.textContainer.node);

    const promoText = new BaseTextComponent('p', 'promo_code_text', '');
    promoText.node.innerHTML = 'Use code <span class="highlight">CALM20</span> for 20% off!';
    this.textContainer.node.appendChild(promoText.node);

    // Создаем контейнер для изображений
    this.imageContainer = new BaseComponent('div', 'image_container');
    this.node.appendChild(this.imageContainer.node);

    this.images.forEach((src, index) => {
      const image = new BaseImageComponent('promo_image', src, 'Promo Image');
      if (index === 0) {
        image.node.classList.add('visible');
      }
      this.imageContainer.node.appendChild(image.node);
    });
  }

  updateImage() {
    const images = this.imageContainer.node.querySelectorAll('.promo_image');
    images.forEach((img, index) => {
      if (index === this.currentImageIndex) {
        img.classList.add('visible');
      } else {
        img.classList.remove('visible');
      }
    });
  }

  startImageRotation() {
    setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.updateImage();
    }, 3000);
  }
}
