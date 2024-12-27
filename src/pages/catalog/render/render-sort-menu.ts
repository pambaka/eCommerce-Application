import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import { CLASS_NAMES, DOM } from '../../../const';
import { SORTING_OPTION } from '../const';
import sortProducts from '../logic/sort-products';

export default function renderSortMenu(parentElement: HTMLElement): void {
  const menu = new BaseComponent('div', 'sort-menu');

  const title = new BaseTextComponent('p', 'sort-title', 'Sort:');

  const dropdown = new BaseComponent('div', 'dropdown');

  const dropdownText = new BaseTextComponent('p', CLASS_NAMES.dropdownText, '');
  DOM.add(CLASS_NAMES.dropdownText, dropdownText.node);

  const dropdownContent = new BaseComponent('div', 'dropdown-content');
  const options = [SORTING_OPTION.priceAsc, SORTING_OPTION.priceDesc, SORTING_OPTION.nameAsc, SORTING_OPTION.nameDesc];
  options.forEach((option) => {
    const element = new BaseTextComponent('p', '', option);
    element.node.addEventListener('click', sortProducts);
    dropdownContent.node.append(element.node);
  });

  dropdown.node.append(dropdownText.node, dropdownContent.node);

  menu.node.append(title.node, dropdown.node);

  parentElement.append(menu.node);
}
