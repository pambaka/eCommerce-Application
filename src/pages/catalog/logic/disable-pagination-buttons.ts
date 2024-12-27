import { CLASS_NAMES, DOM } from '../../../const';

export default function disablePaginationButtons() {
  const prevButton = DOM.elements[CLASS_NAMES.prevButton];
  if (prevButton instanceof HTMLButtonElement) prevButton.disabled = true;

  const nextButton = DOM.elements[CLASS_NAMES.nextButton];
  if (nextButton instanceof HTMLButtonElement) nextButton.disabled = true;
}
