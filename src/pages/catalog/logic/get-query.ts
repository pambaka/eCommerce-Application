import { CLASS_NAMES, DOM } from '../../../const';
import { SORTING_ORDER } from '../const';
import getCategoryQuery from './get-category-query';

export default function getQuery(): string | undefined {
  const queries: string[] = [];

  const categoryQuery = getCategoryQuery();
  if (categoryQuery) queries.push(categoryQuery);

  const dropdown: HTMLElement | undefined = DOM.elements[CLASS_NAMES.dropdownText];

  if (dropdown && dropdown.textContent) {
    const sortingOrder: string | undefined = SORTING_ORDER[dropdown.textContent];
    const sortQuery = `sort=${sortingOrder}`;
    if (sortingOrder) queries.push(sortQuery);
  }

  return queries.join('&');
}
