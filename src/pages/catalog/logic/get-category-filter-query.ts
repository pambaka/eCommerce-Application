import { CLASS_NAMES, DOM } from '../../../const';
import Catalog from '../../../services/catalog';
import { QUERY_BASE } from '../const';

export default function getCategoryFilterQuery(): string | undefined {
  const categoryWrapper = DOM.elements[CLASS_NAMES.filterCategory];
  const categories: NodeListOf<HTMLInputElement> = categoryWrapper.querySelectorAll('input:checked');

  let queryCategory: string | undefined;

  if (categories.length) {
    const array: string[] = [];

    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].value) array.push(`"${Catalog.categories[categories[i].value]}"`);
    }

    queryCategory = `${QUERY_BASE.category}:${array.join(',')}`;
  }

  return queryCategory;
}
