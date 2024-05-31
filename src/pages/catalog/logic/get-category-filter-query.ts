import { CLASS_NAMES, DOM } from '../../../const';
import { CATEGORIES } from '../const';

export default function getCategoryFilterQuery(): string | undefined {
  const categoryWrapper = DOM.elements[CLASS_NAMES.filterCategory];
  const categories: NodeListOf<HTMLInputElement> = categoryWrapper.querySelectorAll('input:checked');

  let queryCategory: string | undefined;

  if (categories.length) {
    const array: string[] = [];

    for (let i = 0; i < categories.length; i += 1) {
      if (categories[i].value) array.push(`"${CATEGORIES[categories[i].value]}"`);
    }

    queryCategory = `filter.query=categories.id:${array.join(',')}`;
  }

  return queryCategory;
}
