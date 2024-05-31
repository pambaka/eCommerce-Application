import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonWithSvgIcon from '../../../components/button-with-svg-icon';
import resetFilters from '../logic/reset-filters';
import crossSprite from '../../../assets/cross-sprite.svg';

export default function renderFilterBar(parentElement: HTMLElement): void {
  const header = new BaseComponent('div', 'filter-block__header');
  const filterBar = new BaseComponent('section', 'filter-bar');

  const title = new BaseTextComponent('p', '', 'Filter options:');

  const button = new ButtonWithSvgIcon(
    'reset-filters-button',
    resetFilters,
    'Reset filters button',
    'reset filters',
    `${crossSprite}#cross`,
  );

  filterBar.node.append(title.node, button.node);

  header.node.append(filterBar.node);

  parentElement.append(header.node);
}
