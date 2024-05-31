import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import LabeledCheckbox from '../../../components/labeled-checkbox';
import { CLASS_NAMES, DOM } from '../../../const';
import { CATEGORIES, PRODUCT_COLORS } from '../const';
import filterProducts from '../logic/filter-products';
import ContainerWithText from '../../../components/container-with-text';

export default function renderFilterBlock(parentElement: HTMLElement): void {
  const wrapper = new BaseComponent('form', 'filter-block');

  const filters = new BaseComponent('div', 'filters');

  const priceFilter = new ContainerWithText('filter-price', 'Price: ');

  const categoryFilter = new ContainerWithText(CLASS_NAMES.filterCategory, 'Category: ');
  Object.keys(CATEGORIES).forEach((category) => {
    const checkbox = new LabeledCheckbox(category, category);
    categoryFilter.node.append(checkbox.node);
  });
  DOM.add(CLASS_NAMES.filterCategory, categoryFilter.node);

  const colorFilter = new ContainerWithText(CLASS_NAMES.filterColor, 'Color: ');
  PRODUCT_COLORS.forEach((color) => {
    const checkbox = new LabeledCheckbox(color, color);
    colorFilter.node.append(checkbox.node);
  });
  DOM.add(CLASS_NAMES.filterColor, colorFilter.node);

  filters.node.append(priceFilter.node, categoryFilter.node, colorFilter.node);

  const button = new ButtonComponent('filter-button', filterProducts, 'Filter', false);

  wrapper.node.append(filters.node, button.node);

  parentElement.append(wrapper.node);
}
