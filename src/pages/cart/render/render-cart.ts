import BaseComponent from '../../../components/base-component';

export default function renderCart(): HTMLElement {
  const cartWrapper = new BaseComponent('div', 'cart-wrapper');
  return cartWrapper.node;
}
