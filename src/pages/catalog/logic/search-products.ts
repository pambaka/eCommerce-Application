import getProducts from '../../../api/get-products';
import getSearchedProducts from '../../../api/get-searched-products';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import LANGUAGE from '../../../types/const';
import { Product, ProductProjection } from '../../../types/products';
import createCard from '../render/create-card';

export default async function searchProducts(event: Event) {
  event.preventDefault();

  const input = DOM.elements[CLASS_NAMES.searchInput] as HTMLInputElement;

  const token: string | null = useToken.anonymous.access.get();

  if (token) {
    let products: ProductProjection[] | Product[] | undefined;

    if (input.value) {
      const query = `text.${LANGUAGE}="${input.value}"`;

      products = await getSearchedProducts(token, query);
    } else {
      products = await getProducts(token);
    }

    if (products) {
      const wrapper: HTMLElement = DOM.elements[CLASS_NAMES.productsWrapper];

      if (products.length === 0) {
        wrapper.innerHTML = 'Nothing was found';
        return;
      }

      wrapper.innerHTML = '';

      for (let i = 0; i < products.length; i += 1) {
        let card: HTMLElement | undefined;

        const product = products[i];

        if ('masterData' in product) {
          card = createCard(product.key, product.masterData.current);
        } else {
          card = createCard(product.key, product);
        }

        wrapper.append(card);
      }
    }
  }
}
