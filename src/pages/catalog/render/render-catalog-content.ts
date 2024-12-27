import getProducts from '../../../api/get-products';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import handleNextButtonState from '../logic/handle-next-button-state';
import handlePrevButtonState from '../logic/handle-prev-button-state';
import renderProducts from './render-products';

export default async function renderCatalogContent() {
  const token = await useToken.client.access.get();

  if (!token) return;

  const products = await getProducts(token, { limit: Pages.cardsPerPage.value, offset: 0 });
  if (products) {
    await renderProducts(products);

    handlePrevButtonState();
    handleNextButtonState();
  }
}
