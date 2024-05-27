import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import showSortedProducts from '../logic/show-sorted-products';

export default function renderSortMenu(parentElement: HTMLElement): void {
  const menu = new BaseComponent('div', 'sort-menu');

  const title = new BaseTextComponent('p', 'sort-title', 'Sort:');

  const dropdown = new BaseComponent('div', 'dropdown');

  const dropdownText = new BaseTextComponent('p', 'dropdown-text', '');

  const dropdownContent = new BaseComponent('div', 'dropdown-content');
  const options = ['price 0 -> 1', 'price 1 -> 0', 'name A -> Z', 'name Z -> A'];
  options.forEach((option) => {
    const element = new BaseTextComponent('p', '', option);
    element.node.addEventListener('click', showSortedProducts);
    dropdownContent.node.append(element.node);
  });

  dropdown.node.append(dropdownText.node, dropdownContent.node);

  menu.node.append(title.node, dropdown.node);

  parentElement.append(menu.node);
}
