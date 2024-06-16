import BaseTextComponent from '../components/base-text-component';
import BaseComponent from '../components/base-component';
import BaseImageComponent from '../components/base-image-component';
import PromoCodeComponentProps from '../types/promocode';

export default class PromoCodeModule extends BaseComponent {
  private imageContainer!: BaseComponent;

  private textContainer!: BaseComponent;

  private currentImageIndex: number;

  private images: string[];

  private promoText: string;

  private rotationInterval: number | undefined;

  constructor({ images, promoText }: PromoCodeComponentProps) {
    super('div', 'promo_code_container');
    this.currentImageIndex = 0;
    this.images = images;
    this.promoText = promoText;
    this.renderPromoCode();
    if (this.images.length > 1) {
      this.startImageRotation();
    }
  }

  renderPromoCode() {
    this.textContainer = new BaseComponent('div', 'text_container');
    this.node.appendChild(this.textContainer.node);

    const promoTextComponent = new BaseTextComponent('p', 'promo_code_text', '');
    promoTextComponent.node.innerHTML = this.promoText;
    this.textContainer.node.appendChild(promoTextComponent.node);

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
    this.rotationInterval = window.setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      this.updateImage();
    }, 3000);
  }

  stopImageRotation() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
}
