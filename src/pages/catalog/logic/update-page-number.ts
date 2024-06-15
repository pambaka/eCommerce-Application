import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';

export default function updatePageNumber() {
  const pageNumber = DOM.elements[CLASS_NAMES.pageNumber];

  if (pageNumber) pageNumber.textContent = `${Pages.currentPage}`;
}
