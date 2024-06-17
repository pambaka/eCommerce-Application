import getCategoryFilterQuery from './get-category-filter-query';
import getCategoryQuery from './get-category-query';
import getColorFilterQuery from './get-color-filter-query';
import getPriceFilterQuery from './get-price-filter-query';

export default function getFilterQuery(): string | undefined {
  const queries: (string | undefined)[] = [];

  const queryPrice: string | undefined = getPriceFilterQuery();
  if (queryPrice) queries.push(queryPrice);

  const queryColor: string | undefined = getColorFilterQuery();
  if (queryColor) queries.push(queryColor);

  const queryCategory: string | undefined = getCategoryFilterQuery();
  if (queryCategory) queries.push(queryCategory);

  const queryCategoryFromUrl: string | undefined = getCategoryQuery();
  if (queryCategoryFromUrl) queries.push(queryCategoryFromUrl);

  return queries.join('&');
}
