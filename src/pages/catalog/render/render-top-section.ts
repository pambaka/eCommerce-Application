import BaseComponent from '../../../components/base-component';
import renderSortMenu from './render-sort-menu';

export default function renderTopSection(parentElement: HTMLElement): void {
  const topSection = new BaseComponent('section', 'catalog-header');

  renderSortMenu(topSection.node);

  parentElement.append(topSection.node);
}
