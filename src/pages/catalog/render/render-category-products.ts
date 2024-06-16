import getSearchedProducts from '../../../api/get-searched-products';
import Catalog from '../../../services/catalog';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import { QUERY_BASE } from '../const';
import renderProducts from './render-products';

export default async function renderCatetoryProducts(key: string): Promise<void> {
  const token: string | null = await useToken.client.access.get();

  if (token) {
    const query = `${QUERY_BASE.category}:"${Catalog.categories[key]}"`;

    const products = await getSearchedProducts(token, { limit: Pages.cardsPerPage.value, offset: 0, query });

    if (products) {
      renderProducts(products);
    }
  }
}
