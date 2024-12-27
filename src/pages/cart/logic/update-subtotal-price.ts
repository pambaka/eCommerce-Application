import { Cart, CartProduct } from '../../../types/cart';
import getActualPrice from './get-actual-price';
import getSubtotalFromCart from './get-subtotal-from-cart';

export default function updateSubtotalPrice(
  cartProductNode: HTMLElement,
  cartItem: CartProduct,
  quantity: number,
  cart: Cart,
) {
  const actualPrice = getActualPrice(cartItem);
  const subTotal = cartProductNode.querySelector('.sub-total');
  const subTotalFull = cartProductNode.querySelector('.subtotal-full');

  if (subTotal instanceof HTMLElement && subTotalFull instanceof HTMLElement) {
    const sum = quantity * actualPrice;
    const subTotalPriceFromCart = getSubtotalFromCart(cartItem.productId, cart);

    if (subTotalPriceFromCart !== sum) {
      subTotalFull.innerText = `€\xa0${sum / 100}`;
    } else {
      subTotalFull.innerText = '';
    }
    subTotal.innerText = `€\xa0${subTotalPriceFromCart / 100}`;
  }
}
