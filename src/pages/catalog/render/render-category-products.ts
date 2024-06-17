import getProducts from '../../../api/get-products';
import Catalog from '../../../services/catalog';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import { QUERY_BASE } from '../const';
import resetFilters from '../logic/reset-filters';
import resetSearchInput from '../logic/reset-search-input';
import resetSortingOrder from '../logic/reset-sorting-order';
import renderProducts from './render-products';

export default async function renderCatetoryProducts(key: string): Promise<void> {
  resetFilters();
  resetSearchInput();
  resetSortingOrder();

  const token: string | null = await useToken.client.access.get();

  if (token) {
    const query = `${QUERY_BASE.category}:"${Catalog.categories[key]}"`;

    const products = await getProducts(token, { limit: Pages.cardsPerPage.value, offset: 0, query });

    if (products) {
      await renderProducts(products);
    }
  }
}
