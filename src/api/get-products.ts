import showModal from '../pages/show-modal';
import useToken from '../services/use-token';
import { Product } from '../types/products';
import { region } from './const';
import Pages from '../services/pages';

export default async function getProducts(
  accessToken: string,
  options?: { limit: number; offset: number },
): Promise<Product[] | undefined> {
  let products: Product[] | undefined;

  let pagination = '';
  if (options) pagination = `?limit=${options.limit}&offset=${options.offset}`;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/products/${pagination}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      console.log(res);

      if (res.status !== 200) {
        if (res.status === 401) {
          console.log(accessToken);
          useToken.client.access.set();
        }
        showModal('Something went wrong', 'Please keep calm and try reloading the page');

        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      console.log(data);
      if (!data) return;

      products = data.results;

      Pages.setLastPage(data.total);
    })
    .catch((error) => error);

  return products;
}
