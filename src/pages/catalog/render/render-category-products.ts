import getSearchedProducts from '../../../api/get-searched-products';
import useToken from '../../../services/use-token';
import { CATEGORIES, QUERY_BASE } from '../const';
import renderProducts from './render-products';

export default async function renderCatetoryProducts(key: string): Promise<void> {
  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    const categoryKey = key.replace('-', ' ');
    const query = `${QUERY_BASE.category}:"${CATEGORIES[categoryKey]}"`;

    const products = await getSearchedProducts(token, query);

    if (products) {
      renderProducts(products);
    }
  }
}
