import { CLASS_NAMES, DOM } from '../../../const';
import { SORTING_ORDER } from '../const';

export default function getSortQuery(): string | undefined {
  let sortQuery: string | undefined;

  const dropdown: HTMLElement | undefined = DOM.elements[CLASS_NAMES.dropdownText];
  if (dropdown && dropdown.textContent) {
    const sortingOrder: string | undefined = SORTING_ORDER[dropdown.textContent];
    if (sortingOrder) {
      sortQuery = `sort=${sortingOrder}`;
    }
  }

  return sortQuery;
}
