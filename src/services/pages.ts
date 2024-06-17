import { CLASS_NAMES, DOM } from '../const';
import handleNextButtonState from '../pages/catalog/logic/handle-next-button-state';
import handlePrevButtonState from '../pages/catalog/logic/handle-prev-button-state';

const CATALOG_GAP = 20;
const OUTER_MARGIN = 40;
const CATALOG_CARD_WIDTH = 220;

export default class Pages {
  static currentPage: number = 1;

  static lastPage: number = 1;

  static rowsPerPage = 2 as const;

  static cardsPerPage = {
    value: 6,

    update: () => {
      const screenWidth = window.innerWidth;

      switch (true) {
        case screenWidth <= 600:
          this.cardsPerPage.value = this.rowsPerPage * 1;
          break;

        // min screen width for $i cards in a row = calc($catalog-card-width * ($i + 1) + $catalog-gap * $i + $outer-margin * 2
        case screenWidth < 1740:
          this.cardsPerPage.value =
            this.rowsPerPage *
            Math.floor((screenWidth - OUTER_MARGIN * 2 - CATALOG_CARD_WIDTH) / (CATALOG_CARD_WIDTH + CATALOG_GAP));
          break;

        case screenWidth >= 1740:
          this.cardsPerPage.value = this.rowsPerPage * 6;
          break;
        default:
          break;
      }

      handlePrevButtonState();
      handleNextButtonState();
    },
  };

  static setLastPage(productsQuantity: number) {
    this.lastPage = Math.ceil(productsQuantity / this.cardsPerPage.value);
    console.log('last page:', this.lastPage);
  }

  static increment() {
    this.currentPage += 1;
    this.updatePageNumber();
    console.log('page:', this.currentPage);
  }

  static decrement() {
    this.currentPage -= 1;
    this.updatePageNumber();
    console.log('page:', this.currentPage);
  }

  static reset() {
    console.log('reseting page');
    this.currentPage = 1;
    this.updatePageNumber();
  }

  private static updatePageNumber() {
    const pageNumber = DOM.elements[CLASS_NAMES.pageNumber];
    if (pageNumber) pageNumber.textContent = `${Pages.currentPage}`;
  }
}
