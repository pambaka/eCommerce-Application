import Counter from '../../../services/counter';
import renderEmptyCart from './empty-cart';

export default function preparePageForEmptyView() {
  const cartWrapper = document.querySelector('.cart-wrapper');
  if (cartWrapper instanceof HTMLElement) {
    cartWrapper.innerHTML = '';
    renderEmptyCart(cartWrapper);
    Counter.reset();
  }
}
