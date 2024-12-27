import getProducts from '../../../api/get-products';
import Pages from '../../../services/pages';
import useToken from '../../../services/use-token';
import renderProducts from '../render/render-products';
import getQuery from './get-query';
import handleNextButtonState from './handle-next-button-state';

export default async function searchProducts(event?: Event) {
  event?.preventDefault();

  Pages.reset();
  Pages.cardsPerPage.update();

  const token: string | null = await useToken.client.access.get();

  if (token) {
    const query = getQuery() ?? '';

    const products = await getProducts(token, {
      limit: Pages.cardsPerPage.value,
      offset: 0,
      query,
    });

    if (products) {
      await renderProducts(products);

      handleNextButtonState();
    }
  }
}
