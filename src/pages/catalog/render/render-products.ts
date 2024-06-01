import { CLASS_NAMES, DOM } from '../../../const';
import BaseTextComponent from '../../../components/base-text-component';
import { Product, ProductProjection } from '../../../types/products';
import createCard from './create-card';

export default async function renderProducts(products: Product[] | ProductProjection[]): Promise<void> {
  const wrapper: HTMLElement = DOM.elements[CLASS_NAMES.productsWrapper];

  wrapper.innerHTML = '';

  if (products.length === 0) {
    const text = new BaseTextComponent('p', 'catalog-error', 'Nothing was found');
    wrapper.append(text.node);

    return;
  }

  for (let i = 0; i < products.length; i += 1) {
    let card: HTMLElement;

    const product = products[i];

    if ('masterData' in product) {
      card = createCard(product.key, product.masterData.current);
    } else {
      card = createCard(product.key, product);
    }

    wrapper.append(card);
  }
}
