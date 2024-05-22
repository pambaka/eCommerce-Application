import './catalog.scss';
import BaseComponent from '../../../components/base-component';
import ProductCard from '../../../modules/product-card/product-card';

export default function renderCatalog(): HTMLElement {
  const wrapper = new BaseComponent('div', 'catalog-wrapper');

  for (let i = 0; i < 8; i += 1) {
    const card = new ProductCard('Product title', '', 'some description with several words. More words');
    wrapper.node.append(card.node);
  }

  return wrapper.node;
}
