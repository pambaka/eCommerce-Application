import BaseComponent from '../../../components/base-component';
import renderEmptyCart from './empty-cart';
import './cart.scss';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';
import getActiveCart from '../../../api/get-active-cart';
import BaseTextComponent from '../../../components/base-text-component';
import renderProductsInCart from './render-products-in-cart';
import calculateSumInCart from '../logic/calculate-sum-in-cart';

export default async function renderCart(): Promise<HTMLElement> {
  const token = await useToken.access.get();
  const cartWrapper = new BaseComponent('div', 'cart-wrapper');
  if (!token) {
    renderEmptyCart(cartWrapper.node);
    return cartWrapper.node;
  }

  const activeCart: Cart | undefined = await getActiveCart(token);

  if (!activeCart || activeCart.lineItems.length === 0) {
    renderEmptyCart(cartWrapper.node);
  } else {
    console.log('activeCart.lineItems: ', activeCart.lineItems);
    const cartTitle = new BaseTextComponent('h2', 'cart-title', 'Shopping Cart');
    cartWrapper.node.append(cartTitle.node);

    renderProductsInCart(activeCart, cartWrapper.node);

    const totalSum = calculateSumInCart(activeCart);

    const total = new BaseTextComponent('h3', 'total', `Total:\xa0€\xa0${totalSum}`);
    cartWrapper.node.append(total.node);
  }

  if (!token) renderEmptyCart(cartWrapper.node);
  return cartWrapper.node;
}
