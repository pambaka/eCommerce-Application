import BaseComponent from '../../../components/base-component';
import renderEmptyCart from './empty-cart';
import './cart.scss';

export default function renderCart(): HTMLElement {
  const cartWrapper = new BaseComponent('div', 'cart-wrapper');
  renderEmptyCart(cartWrapper.node);
  return cartWrapper.node;
}
