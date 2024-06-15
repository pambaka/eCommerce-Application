import { Cart, CartProduct } from '../../../types/cart';
import getActualPrice from './get-actual-price';

export default function getFullPriceFromCart(cart: Cart) {
  const result = cart.lineItems.reduce(
    (acc: number, currentItem: CartProduct) => acc + getActualPrice(currentItem) * currentItem.quantity,
    0,
  );
  return result;
}
