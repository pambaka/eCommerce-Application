import getActiveCart from '../../../api/get-active-cart';
import updateCart from '../../../api/update-cart';
import useToken from '../../../services/use-token';
import { Cart, CartProduct, UpdateCartData } from '../../../types/cart';
import updateTotalPrice from './update-total-rice';

export default async function removeProductFromCart(event: Event, cartItem: CartProduct) {
  const token = await useToken.access.get();
  if (token && event.target instanceof HTMLButtonElement) {
    const activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) return;

    const quantityInput = event.target.parentElement?.querySelector('.quantity-input');
    if (quantityInput instanceof HTMLInputElement) {
      const updateCartData: UpdateCartData = {
        action: 'removeLineItem',
        quantity: Number(quantityInput.value),
        lineItemId: cartItem.id,
      };

      const updatedCart: Cart | undefined = await updateCart(activeCart, cartItem.productId, updateCartData, token);
      const cartProductNode = event.target.closest('.cart__product');
      if (updatedCart && cartProductNode instanceof HTMLElement) {
        cartProductNode.remove();
        updateTotalPrice(updatedCart.totalPrice.centAmount);
      }
    }
  }
}
