import getSortedProducts from '../../../api/get-sorted-products';
import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import LANGUAGE from '../../../types/const';
import { ProductProjection } from '../../../types/products';
import { SORTING_ORDER } from '../const';
import createCard from '../render/create-card';
import getCategoryQuery from './get-category-query';
import resetFilters from './reset-filters';

export default async function sortProducts(this: HTMLElement): Promise<void> {
  resetFilters();

  Pages.cardsPerPage.update();

  const dropdown: HTMLElement | null = document.querySelector('.dropdown-text');

  if (dropdown && this.textContent) {
    if (dropdown.textContent === this.textContent) return;

    dropdown.textContent = this.textContent;

    const sortingOrder: string | undefined = SORTING_ORDER[this.textContent];

    const searchInput = DOM.elements[CLASS_NAMES.searchInput] as HTMLInputElement;

    const categoryQuery: string | undefined = getCategoryQuery();

    const token: string | null = await useToken.anonymous.access.get();

    if (token && sortingOrder) {
      let query: string = sortingOrder;

      if (searchInput.value) query += `&text.${LANGUAGE}=${searchInput.value}`;
      if (categoryQuery) query += `&${categoryQuery}`;

      const products: ProductProjection[] | undefined = await getSortedProducts(token, query);

      if (products) {
        DOM.elements[CLASS_NAMES.productsWrapper].innerHTML = '';

        for (let i = 0; i < products.length; i += 1) {
          const card = createCard(products[i].key, products[i]);

          DOM.elements[CLASS_NAMES.productsWrapper].append(card);
        }
      }
    }
  }
}
