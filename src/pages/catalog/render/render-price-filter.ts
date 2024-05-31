import BaseComponent from '../../../components/base-component';
import renderPriceInputBlock from './render-price-input-block';

export default function renderPriceFilter(parentElement: HTMLElement): void {
  const priceFilter = new BaseComponent('div', 'filter-price');

  const title = new BaseComponent('p');
  title.node.innerHTML = 'Price <span>(up to 1000, €)</span>: ';

  priceFilter.node.append(title.node);

  renderPriceInputBlock('from: ', 'priceFrom', priceFilter.node);

  renderPriceInputBlock('to: ', 'priceTo', priceFilter.node);

  parentElement.append(priceFilter.node);
}
