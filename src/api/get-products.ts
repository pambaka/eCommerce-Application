import showModal from '../pages/show-modal';
import useToken from '../services/use-token';
import { Product } from '../types/products';
import { region } from './const';
import Pages from '../services/pages';
import handleNextButtonState from '../pages/catalog/logic/handle-next-button-state';
import withSpinner from '../utils/with-spinner';

export default async function getProducts(
  accessToken: string,
  options?: {
    limit: number;
    offset: number;
    query?: string;
  },
): Promise<Product[] | undefined> {
  let products: Product[] | undefined;

  await withSpinner(async () => {
    let pagination = '';
    if (options) {
      if (options.query) pagination = `/search?${options.query}&limit=${options.limit}&offset=${options.offset}`;
      else pagination = `?limit=${options.limit}&offset=${options.offset}`;
    }

    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/product-projections${pagination}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          if (res.status === 401) {
            useToken.client.access.set();
          }
          showModal('Something went wrong', 'Please keep calm and try reloading the page');

          return undefined;
        }

        return res.json();
      })
      .then((data) => {
        if (!data) return;

        products = data.results;

        Pages.setLastPage(data.total);
        handleNextButtonState();
      })
      .catch((error) => error);
  });

  return products;
}
