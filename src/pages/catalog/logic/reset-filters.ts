import { CLASS_NAMES, DOM } from '../../../const';
import searchProducts from './search-products';

export default async function resetFilters(): Promise<void> {
  let isReseted: boolean = false;

  const priceFrom = document.getElementById('priceFrom');
  if (priceFrom instanceof HTMLInputElement && priceFrom.value !== '') {
    priceFrom.value = '';
    isReseted = true;
  }

  const priceTo = document.getElementById('priceTo');
  if (priceTo instanceof HTMLInputElement && priceTo.value !== '') {
    priceTo.value = '';
    isReseted = true;
  }

  const filters: HTMLElement[] = [];

  const categoryFilter = DOM.elements[CLASS_NAMES.filterCategory];
  const colorFilter = DOM.elements[CLASS_NAMES.filterColor];

  filters.push(categoryFilter, colorFilter);

  filters.forEach((filter) => {
    const colorCheckboxes = filter.querySelectorAll('input');

    colorCheckboxes.forEach((checkbox) => {
      const checkboxPointer = checkbox;
      if (checkboxPointer.checked === true) {
        checkboxPointer.checked = false;
        isReseted = true;
      }
    });
  });

  if (isReseted) await searchProducts();
}
