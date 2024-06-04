import Catalog from '../../../services/catalog';
import Router from '../../../services/router';
import { QUERY_BASE } from '../const';

export default function getCategoryQuery(): string | undefined {
  let query: string | undefined;

  const { hash } = window.location;
  const category = hash.replace(`${Router.pages.catalog}`, '').replace('/', '');

  if (category) query = `${QUERY_BASE.category}:"${Catalog.categories[category]}"`;

  return query;
}
