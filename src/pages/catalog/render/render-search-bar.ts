import BaseComponent from '../../../components/base-component';
import ButtonWithSvgIcon from '../../../components/button-with-svg-icon';
import searchProducts from '../logic/search-products';
import searchIcon from '../../../assets/search-sprite.svg';
import { CLASS_NAMES, DOM } from '../../../const';

export default function renderSearchBar(parentElement: HTMLElement) {
  const searchBar = new BaseComponent('form', 'search-bar');

  const input = new BaseComponent<HTMLInputElement>('input', CLASS_NAMES.searchInput);
  input.node.type = 'text';
  DOM.add(CLASS_NAMES.searchInput, input.node);

  const button = new ButtonWithSvgIcon(
    'button-search',
    searchProducts,
    'Search product button',
    'search product',
    `${searchIcon}#search`,
  );

  searchBar.node.append(input.node, button.node);

  parentElement.append(searchBar.node);
}
