import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import filterProducts from '../logic/filter-products';
import renderPriceFilter from './render-price-filter';
import renderCategoryFilter from './render-category-filter';
import renderColorFilter from './render-color-filter';
import { CLASS_NAMES, DOM } from '../../../const';

export default function renderFilterBlock(parentElement: HTMLElement): void {
  const wrapper = new BaseComponent('form', CLASS_NAMES.filters);
  DOM.add(CLASS_NAMES.filters, wrapper.node);

  const filters = new BaseComponent('div', 'filters');

  renderPriceFilter(filters.node);

  renderCategoryFilter(filters.node);

  renderColorFilter(filters.node);

  const button = new ButtonComponent('filter-button', filterProducts, 'Filter', false);

  wrapper.node.append(filters.node, button.node);

  parentElement.append(wrapper.node);
}
