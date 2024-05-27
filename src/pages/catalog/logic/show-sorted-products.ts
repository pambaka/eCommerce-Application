import getSortedProducts from '../../../api/get-sorted-products';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import { ProductProjection } from '../../../types/products';
import SORTING_OPTION from '../const';
import createCard from '../render/create-card';

export default async function showSortedProducts(this: HTMLElement): Promise<void> {
  const dropdown: HTMLElement | null = document.querySelector('.dropdown-text');

  if (dropdown && this.textContent) {
    if (dropdown.textContent === this.textContent) return;

    dropdown.textContent = this.textContent;

    let sortingOrder: string | undefined;

    switch (this.textContent) {
      case SORTING_OPTION.priceAsc:
        sortingOrder = 'price asc';
        break;
      case SORTING_OPTION.priceDesc:
        sortingOrder = 'price desc';
        break;
      case SORTING_OPTION.nameAsc:
        sortingOrder = 'name.en-US asc';
        break;
      case SORTING_OPTION.nameDesc:
        sortingOrder = 'name.en-US desc';
        break;
      default:
        break;
    }

    const token: string | null = useToken.anonymous.access.get();

    if (token && sortingOrder) {
      const products: ProductProjection[] | undefined = await getSortedProducts(token, sortingOrder);

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
