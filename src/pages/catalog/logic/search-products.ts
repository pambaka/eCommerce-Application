import getProducts from '../../../api/get-products';
import getSearchedProducts from '../../../api/get-searched-products';
import getSortedProducts from '../../../api/get-sorted-products';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import LANGUAGE from '../../../types/const';
import { Product, ProductProjection } from '../../../types/products';
import { SORTING_ORDER } from '../const';
import renderProducts from '../render/render-products';

export default async function searchProducts(event?: Event) {
  event?.preventDefault();

  const input = DOM.elements[CLASS_NAMES.searchInput] as HTMLInputElement;

  const dropdownText = DOM.elements[CLASS_NAMES.dropdownText];

  let sortQuery: string | undefined;
  if (dropdownText.textContent) sortQuery = SORTING_ORDER[dropdownText.textContent];

  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    let products: ProductProjection[] | Product[] | undefined;

    if (input.value) {
      let query = `text.${LANGUAGE}="${input.value}"`;

      if (sortQuery) query += `&sort=${sortQuery}`;

      products = await getSearchedProducts(token, query);
    } else if (sortQuery) {
      products = await getSortedProducts(token, sortQuery);
    } else {
      products = await getProducts(token);
    }

    if (products) {
      renderProducts(products);
    }
  }
}
