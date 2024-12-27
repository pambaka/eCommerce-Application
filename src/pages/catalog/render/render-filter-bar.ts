import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import resetFilters from '../logic/reset-filters';
import ButtonComponent from '../../../components/button-component';

export default function renderFilterBar(parentElement: HTMLElement): void {
  const header = new BaseComponent('div', 'filter-block__header');

  const filterBar = new BaseComponent('section', 'filter-bar');
  const title = new BaseTextComponent('p', '', 'Filter options:');
  const button = new ButtonComponent('reset-filters-button', resetFilters, 'reset', false);
  filterBar.node.append(title.node, button.node);

  header.node.append(filterBar.node);

  parentElement.append(header.node);
}
