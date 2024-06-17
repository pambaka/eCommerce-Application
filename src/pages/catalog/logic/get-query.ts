import getCategoryQuery from './get-category-query';
import getSearchQuery from './get-search-query';
import getSortQuery from './get-sort-query';

export default function getQuery(): string | undefined {
  const queries: string[] = [];

  const categoryQuery: string | undefined = getCategoryQuery();
  if (categoryQuery) queries.push(categoryQuery);

  const searchQuery: string | undefined = getSearchQuery();
  if (searchQuery) queries.push(searchQuery);

  const sortQuery: string | undefined = getSortQuery();
  if (sortQuery) queries.push(sortQuery);

  return queries.join('&');
}
