import getSearchedProducts from '../../../api/get-searched-products';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import Filters from './filters';
import getCategoryFilterQuery from './get-category-filter-query';
import getCategoryQuery from './get-category-query';
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

  const queryCategoryFromUrl: string | undefined = getCategoryQuery();
  if (queryCategoryFromUrl) queries.push(queryCategoryFromUrl);

  Filters.saveMarked();

  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    const products = await getSearchedProducts(token, queries.join('&'));

    if (products) {
      renderProducts(products);
    }

    Filters.markFiltered();
  }
}
