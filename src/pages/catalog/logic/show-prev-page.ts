import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import disablePaginationButtons from './disable-pagination-buttons';
import handlePrevButtonState from './handle-prev-button-state';
import handleNextButtonState from './handle-next-button-state';
import getQuery from './get-query';
import getProducts from '../../../api/get-products';

export default async function showPrevPage() {
  disablePaginationButtons();

  const token = await useToken.client.access.get();
  if (!token) {
    handlePrevButtonState();
    handleNextButtonState();
    return;
  }

  if (Pages.currentPage > 1) {
    const query = getQuery();

    const products = await getProducts(token, {
      limit: Pages.cardsPerPage.value,
      offset: (Pages.currentPage - 2) * Pages.cardsPerPage.value,
      query,
    });

    if (products) {
      renderProducts(products);

      Pages.decrement();
    }
  }

  handlePrevButtonState();
  handleNextButtonState();
}
