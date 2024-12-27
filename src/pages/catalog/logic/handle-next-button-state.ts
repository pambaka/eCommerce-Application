import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';

export default function handleNextButtonState() {
  const button = DOM.elements[CLASS_NAMES.nextButton];

  if (!(button instanceof HTMLButtonElement)) return;

  if (Pages.currentPage < Pages.lastPage) button.disabled = false;
  else button.disabled = true;
}
