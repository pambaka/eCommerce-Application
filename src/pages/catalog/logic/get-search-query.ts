import { CLASS_NAMES, DOM } from '../../../const';
import LANGUAGE from '../../../types/const';

export default function getSearchQuery(): string | undefined {
  let searchQuery: string | undefined;

  const searchInput = DOM.elements[CLASS_NAMES.searchInput];
  if (searchInput instanceof HTMLInputElement && searchInput.value) {
    searchQuery = `text.${LANGUAGE}="${searchInput.value}"&fuzzy=true`;
  }

  return searchQuery;
}
