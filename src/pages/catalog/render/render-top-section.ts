import BaseComponent from '../../../components/base-component';
import renderSearchBar from './render-search-bar';
import renderSortMenu from './render-sort-menu';

export default function renderTopSection(parentElement: HTMLElement): void {
  const topSection = new BaseComponent('section', 'catalog-header');

  renderSearchBar(topSection.node);
  renderSortMenu(topSection.node);

  parentElement.append(topSection.node);
}
