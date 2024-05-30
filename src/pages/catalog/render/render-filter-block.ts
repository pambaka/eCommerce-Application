import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import LabeledCheckbox from '../../../components/labeled-checkbox';
import { CLASS_NAMES, DOM } from '../../../const';
import { CATEGORIES, PRODUCT_COLORS } from '../const';

export default function renderFilterBlock(parentElement: HTMLElement): void {
  const wrapper = new BaseComponent('form', 'filter-block');

  const filters = new BaseComponent('div', 'filters');

  const priceWrapper = new BaseComponent('div', 'filter-price');
  const priceText = new BaseTextComponent('p', '', 'Price:');
  priceWrapper.node.append(priceText.node);

  const categoryWrapper = new BaseComponent('div', CLASS_NAMES.filterCategory);
  const categoryText = new BaseTextComponent('p', '', 'Category:');
  categoryWrapper.node.append(categoryText.node);
  DOM.add(CLASS_NAMES.filterCategory, categoryWrapper.node);

  Object.keys(CATEGORIES).forEach((category) => {
    const checkbox = new LabeledCheckbox(category, category);
    categoryWrapper.node.append(checkbox.node);
  });

  const colorWrapper = new BaseComponent('div', CLASS_NAMES.filterColor);
  const colorText = new BaseTextComponent('p', '', 'Color:');
  colorWrapper.node.append(colorText.node);
  DOM.add(CLASS_NAMES.filterColor, colorWrapper.node);

  PRODUCT_COLORS.forEach((color) => {
    const checkbox = new LabeledCheckbox(color, color);
    colorWrapper.node.append(checkbox.node);
  });

  filters.node.append(priceWrapper.node, categoryWrapper.node, colorWrapper.node);

  const button = new ButtonComponent('filter-button', () => console.log('click'), 'Filter', false);

  wrapper.node.append(filters.node, button.node);

  parentElement.append(wrapper.node);
}
