import BaseComponent from '../../../components/base-component';
import ButtonComponent from '../../../components/button-component';
import clearCart from '../logic/clear-cart';

export default function createClearAndCheckoutButtons(parentElement: HTMLElement) {
  const buttonsWrapper = new BaseComponent('div', 'buttons-wrapper');
  const clearCartBtn = new ButtonComponent('clear-cart-btn', clearCart, 'Clear cart', false);

  const checkout = new ButtonComponent('checkout-btn', () => {}, 'Proceed to checkout', true);

  buttonsWrapper.node.append(clearCartBtn.node, checkout.node);
  parentElement.append(buttonsWrapper.node);
}
