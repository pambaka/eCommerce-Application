import getSearchedProducts from '../../../api/get-searched-products';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import getCategoryFilterQuery from './get-category-filter-query';
import getColorFilterQuery from './get-color-filter-query';
import getPriceFilterQuery from './get-price-filter-query';

export default async function filterProducts(event: Event): Promise<void> {
  event.preventDefault();

  const queries: string[] = [];

  const queryPrice: string | undefined = getPriceFilterQuery();
  if (queryPrice) queries.push(queryPrice);

  const queryColor: string | undefined = getColorFilterQuery();
  if (queryColor) queries.push(queryColor);

  const queryCategory: string | undefined = getCategoryFilterQuery();
  if (queryCategory) queries.push(queryCategory);

  const token: string | null = useToken.anonymous.access.get();

  if (token) {
    const products = await getSearchedProducts(token, queries.join('&'));

    if (products) {
      renderProducts(products);
    }
  }
}
