import BaseImageComponent from '../../../components/base-image-component';
import BaseTextComponent from '../../../components/base-text-component';
import Router from '../../../services/router';
import emptyCartImage from '../../../assets/empty-cart.png';
import BaseLinkComponent from '../../../components/base-link-component';

export default function renderEmptyCart(parentElement: HTMLElement): void {
  const emptyImage = new BaseImageComponent('empty-image', emptyCartImage, 'Empty cart');
  const cartIsEmpty = new BaseTextComponent('h4', 'cart-is-empty', "Your cart is empty, but\xa0it's\xa0fixable\xa00_o");
  const catalogButton = new BaseLinkComponent(Router.pages.catalog, 'catalog-link', 'OPEN CATALOG');

  parentElement.append(emptyImage.node, cartIsEmpty.node, catalogButton.node);
}
