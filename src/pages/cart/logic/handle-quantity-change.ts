import getActiveCart from '../../../api/get-active-cart';
import updateCart from '../../../api/update-cart';
import useToken from '../../../services/use-token';
import { Cart, CartProduct, UpdateCartData } from '../../../types/cart';
import updateSubtotalPrice from './update-subtotal-price';
import updateTotalPrice from './update-total-price';

export default async function handleQuantityChange(event: Event, cartItem: CartProduct) {
  const inputField = event.currentTarget;
  const token = await useToken.access.get();
  if (inputField instanceof HTMLInputElement && token) {
    const activeCart: Cart | undefined = await getActiveCart(token);
    if (!activeCart) return;

    const updateCartData: UpdateCartData = {
      action: 'changeLineItemQuantity',
      quantity: Number(inputField.value),
      lineItemId: cartItem.id,
    };

    const updatedCart: Cart | undefined = await updateCart(activeCart, cartItem.productId, updateCartData, token);

    const cartProductNode = inputField.closest('.cart__product');
    if (updatedCart && cartProductNode instanceof HTMLElement) {
      updateSubtotalPrice(cartProductNode, cartItem, Number(inputField.value), updatedCart);
      updateTotalPrice(updatedCart);
    }
  }
}
