import getSearchedProducts from '../../../api/get-searched-products';
import Catalog from '../../../services/catalog';
import useToken from '../../../services/use-token';
import { QUERY_BASE } from '../const';
import renderProducts from './render-products';

export default async function renderCatetoryProducts(key: string): Promise<void> {
  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    const query = `${QUERY_BASE.category}:"${Catalog.categories[key]}"`;

    const products = await getSearchedProducts(token, query);

    if (products) {
      renderProducts(products);
    }
  }
}
