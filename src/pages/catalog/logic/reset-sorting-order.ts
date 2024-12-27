import { CLASS_NAMES, DOM } from '../../../const';

export default function resetSortingOrder(): void {
  const dropdownText: HTMLElement | undefined = DOM.elements[CLASS_NAMES.dropdownText];
  if (dropdownText) dropdownText.textContent = '';
}
