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
    this.images = ['src/assets/images/1.jpg', 'src/assets/images/2.jpg', 'src/assets/images/3.jpg'];
    this.renderPromoCode();
    this.startImageRotation();
  }

  renderPromoCode() {
    this.textContainer = new BaseComponent('div', 'text_container');
    this.node.appendChild(this.textContainer.node);

    const promoText = new BaseTextComponent('p', 'promo_code_text', '');
    promoText.node.innerHTML = 'Use code <span class="highlight">CALM20</span> for 20% off!';
    this.textContainer.node.appendChild(promoText.node);

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
