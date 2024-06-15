import './catalog.scss';
import BaseComponent from '../../../components/base-component';
import { CLASS_NAMES, DOM } from '../../../const';
import renderTopSection from './render-top-section';
import renderFilterBar from './render-filter-bar';
import renderFilterBlock from './render-filter-block';
import Breadcrumbs from './breadcrumbs';
import Router from '../../../services/router';
import renderCategories from './render-categories';
import renderPaginationBlock from './render-pagination-block';
import Pages from '../../../services/pages';

export default function renderEmptyCatalog(): HTMLElement {
  const catalog = new BaseComponent('div', 'catalog');

  const breadcrumbsWrapper = new BaseComponent('div', 'breadcrumbs-wrapper');
  breadcrumbsWrapper.node.append(Breadcrumbs.node);
  Breadcrumbs.init();
  Breadcrumbs.renderLinks();

  if (window.location.hash === Router.pages.catalog) renderCategories(breadcrumbsWrapper.node);

  const content = new BaseComponent('div', 'catalog-content');

  const leftColumn = new BaseComponent('div', 'catalog-left');
  renderFilterBar(leftColumn.node);
  renderFilterBlock(leftColumn.node);

  const rightColumn = new BaseComponent('div', 'catalog-right');
  renderTopSection(rightColumn.node);

  const wrapper = new BaseComponent('section', CLASS_NAMES.productsWrapper);
  DOM.add(CLASS_NAMES.productsWrapper, wrapper.node);

  rightColumn.node.append(wrapper.node);

  renderPaginationBlock(rightColumn.node);
  Pages.cardsPerPage.calculate(window.innerWidth);

  content.node.append(leftColumn.node, rightColumn.node);

  catalog.node.append(breadcrumbsWrapper.node, content.node);

  return catalog.node;
}
