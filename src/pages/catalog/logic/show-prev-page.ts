import getProducts from '../../../api/get-products';
import { CLASS_NAMES, DOM } from '../../../const';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import disablePaginationButtons from './disable-pagination-buttons';
import handlePrevButtonState from './handle-prev-button-state';
import handleNextButtonState from './handle-next-button-state';
import updatePageNumber from './update-page-number';

export default async function showPrevPage() {
  disablePaginationButtons();

  const token = await useToken.client.access.get();

  if (!token) return;

  if (Pages.currentPage > 1) {
    const products = await getProducts(token, {
      limit: Pages.cardsPerPage.value,
      offset: (Pages.currentPage - 2) * Pages.cardsPerPage.value,
    });

    if (products) {
      const wrapper = DOM.elements[CLASS_NAMES.productsWrapper];
      wrapper.innerHTML = '';

      renderProducts(products);

      Pages.decrement();

      updatePageNumber();
    }

    handlePrevButtonState();
    handleNextButtonState();
  }
}
