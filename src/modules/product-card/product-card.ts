import './product-card.scss';
import BaseComponent from '../../components/base-component';
import BaseTextComponent from '../../components/base-text-component';

export default class ProductCard extends BaseComponent {
  title;

  image: HTMLElement;

  description;

  constructor(title: string, imgUrl: string, description: string) {
    super('article', 'product-card');

    this.title = new BaseTextComponent('h3', 'card__title', title);

    this.image = document.createElement('div');
    this.image.style.backgroundImage = `url(${imgUrl})`;

    this.description = new BaseTextComponent('p', 'card__description', description);

    this.node.append(this.title.node, this.image, this.description.node);
  }
}
