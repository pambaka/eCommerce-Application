import getActiveCart from '../../../api/get-active-cart';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';

export default async function isCartEmpty() {
  const token = await useToken.access.get();
  if (!token) return;
  console.log('token: ', token);

  const activeCart: Cart | undefined = await getActiveCart(token);
  console.log('activeCart: ', activeCart);
}
