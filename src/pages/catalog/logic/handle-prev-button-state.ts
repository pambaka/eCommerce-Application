import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';

export default function handlePrevButtonState() {
  const button = DOM.elements[CLASS_NAMES.prevButton];

  if (!(button instanceof HTMLButtonElement)) return;

  if (Pages.currentPage === 1) button.disabled = true;
  else button.disabled = false;
}
