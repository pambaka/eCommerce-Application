import deleteCart from '../../../api/delete-cart';
import getActiveCart from '../../../api/get-active-cart';
import Counter from '../../../services/counter';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';
import renderEmptyCart from '../render/empty-cart';

export default async function clearCart() {
  const token = await useToken.access.get();
  if (!token) return;
  const activeCart: Cart | undefined = await getActiveCart(token);
  if (!activeCart) return;

  const clearedCart = await deleteCart(token, activeCart.id, activeCart.version);
  if (clearedCart) {
    const cartWrapper = document.querySelector('.cart-wrapper');
    if (cartWrapper instanceof HTMLElement) {
      cartWrapper.innerHTML = '';
      renderEmptyCart(cartWrapper);
      Counter.reset();
    }
  }
}
