import { CLASS_NAMES, DOM } from '../../../const';

export default function resetSearchInput(): void {
  const searchInput: HTMLElement | undefined = DOM.elements[CLASS_NAMES.searchInput];
  if (searchInput instanceof HTMLInputElement) searchInput.value = '';
}
