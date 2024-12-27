import getProducts from '../../../api/get-products';
import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import getQuery from './get-query';

export default async function sortProducts(this: HTMLElement): Promise<void> {
  Pages.cardsPerPage.update();

  const dropdown: HTMLElement | undefined = DOM.elements[CLASS_NAMES.dropdownText];

  if (dropdown && this.textContent) {
    if (dropdown.textContent === this.textContent) return;

    dropdown.textContent = this.textContent;

    const query = getQuery() ?? '';

    const token: string | null = await useToken.client.access.get();

    if (token) {
      const products = await getProducts(token, {
        limit: Pages.cardsPerPage.value,
        offset: Pages.cardsPerPage.value * (Pages.currentPage - 1),
        query,
      });

      if (products) {
        await renderProducts(products);
      }
    }
  }
}
