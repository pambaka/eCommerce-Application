import { Cart } from '../../../types/cart';

export default function getSubtotalFromCart(productId: string, cart: Cart) {
  let subTotalPrice = 0;
  cart.lineItems.forEach((lineItem) => {
    if (lineItem.productId === productId) {
      subTotalPrice = lineItem.totalPrice.centAmount;
    }
  });
  return subTotalPrice;
}
