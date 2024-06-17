import { CLASS_NAMES, DOM } from '../../../const';
import BaseTextComponent from '../../../components/base-text-component';
import { Product, ProductProjection } from '../../../types/products';
import createCard from './create-card';
import getActiveCart from '../../../api/get-active-cart';
import useToken from '../../../services/use-token';
import { Cart } from '../../../types/cart';

export default async function renderProducts(products: Product[] | ProductProjection[]): Promise<void> {
  const wrapper: HTMLElement = DOM.elements[CLASS_NAMES.productsWrapper];

  wrapper.innerHTML = '';

  if (products.length === 0) {
    const text = new BaseTextComponent('p', 'catalog-error', 'Nothing was found');
    wrapper.append(text.node);

    return;
  }

  let activeCart: Cart | undefined;

  const token = await useToken.access.get();
  if (token) activeCart = await getActiveCart(token);

  for (let i = 0; i < products.length; i += 1) {
    let card: HTMLElement;

    const product = products[i];

    let isProductInCart: boolean = false;
    if (activeCart) isProductInCart = activeCart.lineItems.some((item) => item.productId === product.id);

    if ('masterData' in product) {
      card = createCard(product.key, product.masterData.current, isProductInCart);
    } else {
      card = createCard(product.key, product, isProductInCart);
    }

    wrapper.append(card);
  }
}
