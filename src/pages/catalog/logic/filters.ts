import { CLASS_NAMES, DOM } from '../../../const';

export default class Filters {
  static markedCheckboxes: HTMLInputElement[] = [];

  static saveMarked() {
    this.resetMarks();
    const filters = DOM.elements[CLASS_NAMES.filters];

    if (filters) {
      const markedCheckboxes: NodeListOf<HTMLInputElement> = filters.querySelectorAll('input:checked');
      Filters.markedCheckboxes = Array.from(markedCheckboxes);
    }
  }

  static markFiltered() {
    Filters.resetMarks();

    Filters.markedCheckboxes.forEach((checkbox) => {
      checkbox.parentElement?.classList.add('is-filtered');
    });
  }

  static resetMarks() {
    const filters = DOM.elements[CLASS_NAMES.filters];

    if (filters) {
      const checkboxes: NodeListOf<HTMLInputElement> = filters.querySelectorAll(`input[type='checkbox']`);
      checkboxes.forEach((checkbox) => {
        checkbox.parentElement?.classList.remove('is-filtered');
      });
    }
  }
}
