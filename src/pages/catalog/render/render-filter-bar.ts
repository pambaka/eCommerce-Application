import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';

export default function renderFilterBar(parentElement: HTMLElement): void {
  const header = new BaseComponent('div', 'filter-block__header');
  const filterBar = new BaseComponent('section', 'filter-bar');

  const title = new BaseTextComponent('p', '', 'Filter options:');
  filterBar.node.append(title.node);

  header.node.append(filterBar.node);

  parentElement.append(header.node);
}
