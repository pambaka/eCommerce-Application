import getCategoryQuery from './get-category-query';

export default function getQuery(): string | undefined {
  const categoryQuery = getCategoryQuery();

  return categoryQuery;
}
