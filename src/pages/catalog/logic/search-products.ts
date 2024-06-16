import getProducts from '../../../api/get-products';
import getSearchedProducts from '../../../api/get-searched-products';
import getSortedProducts from '../../../api/get-sorted-products';
import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import LANGUAGE from '../../../types/const';
import { Product, ProductProjection } from '../../../types/products';
import { SORTING_ORDER } from '../const';
import renderProducts from '../render/render-products';
import getCategoryQuery from './get-category-query';
import resetFilters from './reset-filters';
import resetPagination from './reset-pagination';

export default async function searchProducts(event?: Event) {
  event?.preventDefault();

  resetFilters();

  const input = DOM.elements[CLASS_NAMES.searchInput] as HTMLInputElement;

  const dropdownText = DOM.elements[CLASS_NAMES.dropdownText];

  let sortQuery: string | undefined;
  if (dropdownText.textContent) sortQuery = SORTING_ORDER[dropdownText.textContent];

  const categoryQuery: string | undefined = getCategoryQuery();

  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    let products: ProductProjection[] | Product[] | undefined;

    if (input.value) {
      let query = `text.${LANGUAGE}="${input.value}"&fuzzy=true`;

      if (sortQuery) query += `&sort=${sortQuery}`;
      if (categoryQuery) query += `&${categoryQuery}`;

      products = await getSearchedProducts(token, { limit: Pages.cardsPerPage.value, offset: 0, query });
    } else if (sortQuery) {
      let query = sortQuery;
      if (categoryQuery) query += `&${categoryQuery}`;

      products = await getSortedProducts(token, query);
    } else if (categoryQuery) {
      products = await getSearchedProducts(token, { limit: Pages.cardsPerPage.value, offset: 0, query: categoryQuery });
    } else {
      products = await getProducts(token);
    }

    if (products) {
      renderProducts(products);

      resetPagination();
    }
  }
}
