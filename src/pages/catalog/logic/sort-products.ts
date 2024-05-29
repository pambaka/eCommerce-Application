import getSortedProducts from '../../../api/get-sorted-products';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import LANGUAGE from '../../../types/const';
import { ProductProjection } from '../../../types/products';
import { SORTING_ORDER } from '../const';
import createCard from '../render/create-card';

export default async function sortProducts(this: HTMLElement): Promise<void> {
  const dropdown: HTMLElement | null = document.querySelector('.dropdown-text');

  if (dropdown && this.textContent) {
    if (dropdown.textContent === this.textContent) return;

    dropdown.textContent = this.textContent;

    const sortingOrder: string | undefined = SORTING_ORDER[this.textContent];

    const searchInput = DOM.elements[CLASS_NAMES.searchInput] as HTMLInputElement;

    const token: string | null = useToken.anonymous.access.get();

    if (token && sortingOrder) {
      let products: ProductProjection[] | undefined;

      if (searchInput.value) {
        products = await getSortedProducts(token, `${sortingOrder}&text.${LANGUAGE}=${searchInput.value}`);
      } else {
        products = await getSortedProducts(token, sortingOrder);
      }

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
