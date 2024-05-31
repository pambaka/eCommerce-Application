import { CLASS_NAMES, DOM } from '../../../const';
import searchProducts from './search-products';

export default async function resetFilters(): Promise<void> {
  const priceFrom = document.getElementById('priceFrom');
  const priceTo = document.getElementById('priceTo');

  if (priceFrom instanceof HTMLInputElement) priceFrom.value = '';
  if (priceTo instanceof HTMLInputElement) priceTo.value = '';

  const colorFilter = DOM.elements[CLASS_NAMES.filterColor];
  const colorCheckboxes = colorFilter.querySelectorAll('input');
  colorCheckboxes.forEach((checkbox) => {
    const checkboxPointer = checkbox;
    checkboxPointer.checked = false;
  });

  const categoryFilter = DOM.elements[CLASS_NAMES.filterCategory];
  const categoryCheckboxes = categoryFilter.querySelectorAll('input');
  categoryCheckboxes.forEach((checkbox) => {
    const checkboxPointer = checkbox;
    checkboxPointer.checked = false;
  });

  await searchProducts();
}
