import BaseComponent from '../../../components/base-component';
import ButtonWithSvgIcon from '../../../components/button-with-svg-icon';
import searchProducts from '../logic/search-products';
import searchIcon from '../../../assets/search-sprite.svg';

export default function renderSearchBar(parentElement: HTMLElement) {
  const searchBar = new BaseComponent('form', 'search-bar');

  const input = new BaseComponent<HTMLInputElement>('input', 'search-input');
  input.node.type = 'text';

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
