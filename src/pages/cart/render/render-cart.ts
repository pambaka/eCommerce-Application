import BaseComponent from '../../../components/base-component';
import renderEmptyCart from './empty-cart';
import './cart.scss';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';
import getActiveCart from '../../../api/get-active-cart';
import BaseTextComponent from '../../../components/base-text-component';
import renderProductsInCart from './render-products-in-cart';
import renderPromo from './render-promo';
import getFullPriceFromCart from '../logic/get-full-price-from-cart';
import lookForAppliedPromocodes from '../logic/look-for-applied-promocodes';
import showAppliedPromocodes from '../logic/show-applied-promocodes';

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
    const cartTitle = new BaseTextComponent('h2', 'cart-title', 'Shopping Cart');
    cartWrapper.node.append(cartTitle.node);

    renderProductsInCart(activeCart, cartWrapper.node);

    renderPromo(cartWrapper.node);

    const totalWrapper = new BaseComponent('p', 'total-wrapper');
    const totalTitle = new BaseTextComponent('span', 'total-title', `Total: `);

    const cartTotalPrice = activeCart.totalPrice.centAmount;
    const totalWithoutDiscount = new BaseTextComponent('span', 'total-full', ``);

    if (activeCart.discountCodes.length > 0) {
      const fullTotalPriceValue = getFullPriceFromCart(activeCart);

      if (cartTotalPrice !== fullTotalPriceValue)
        totalWithoutDiscount.node.innerText = `€\xa0${fullTotalPriceValue / 100}`;
    }

    const total = new BaseTextComponent('span', 'total', `€ ${cartTotalPrice / 100}`);
    totalWrapper.node.append(totalTitle.node, totalWithoutDiscount.node, total.node);
    cartWrapper.node.append(totalWrapper.node);

    showAppliedPromocodes(token, activeCart, totalWrapper.node);
  }

  if (activeCart) lookForAppliedPromocodes(activeCart);

  return cartWrapper.node;
}
