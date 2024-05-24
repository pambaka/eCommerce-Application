import './product-card.scss';
import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';
import { CardPrice } from '../../types/index';

export default class ProductCard extends BaseComponent {
  constructor(title: string, imageUrl: string, description: string, price: CardPrice) {
    super('article', 'product-card');

    this.addTitle(title);
    this.addImage(imageUrl);
    this.addDescription(description);
    this.addPrices(price);
  }

  private addTitle(title: string) {
    const cardTitle = new BaseTextComponent('h3', 'card__title', title);

    this.node.append(cardTitle.node);
  }

  private addImage(imageUrl: string) {
    const image = new BaseComponent('div', 'card__image');
    image.node.style.backgroundImage = `url(${imageUrl})`;

    this.node.append(image.node);
  }

  private addDescription(description: string) {
    const cardDescription = new BaseTextComponent('p', 'card__description', description);

    this.node.append(cardDescription.node);
  }

  private addPrices(price: CardPrice) {
    const prices = new BaseComponent('div', 'card__prices');
    const priceWrapper = new BaseTextComponent('p', 'price--regular', `€ ${String(price.regular)}`);
    prices.node.append(priceWrapper.node);

    if (price.discounted) {
      priceWrapper.node.classList.add('price--old');

      const discountedPriceWrapper = new BaseTextComponent('p', 'price--discount', `€ ${String(price.discounted)}`);
      prices.node.append(discountedPriceWrapper.node);
    }

    this.node.append(prices.node);
  }
}
