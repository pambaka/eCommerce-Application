import deleteCart from '../../../api/delete-cart';
import getActiveCart from '../../../api/get-active-cart';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';
import preparePageForEmptyView from '../render/prepare-for-empty-cart-view';

export default async function clearCart() {
  const token = await useToken.access.get();
  if (!token) return;
  const activeCart: Cart | undefined = await getActiveCart(token);
  if (!activeCart) return;

  const clearedCart = await deleteCart(token, activeCart.id, activeCart.version);
  if (clearedCart) {
    preparePageForEmptyView();
  }
}
