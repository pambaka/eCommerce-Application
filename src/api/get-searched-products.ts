import handleNextButtonState from '../pages/catalog/logic/handle-next-button-state';
import showModal from '../pages/show-modal';
import Pages from '../services/pages';
import { ProductProjection } from '../types/products';
import { region } from './const';

export default async function getSearchedProducts(
  accessToken: string,
  options: {
    limit: number;
    offset: number;
    query: string;
  },
): Promise<ProductProjection[] | undefined> {
  let products: ProductProjection[] | undefined;

  const pagination = `&limit=${options.limit}&offset=${options.offset}`;

  await fetch(
    `https://api.${region}.commercetools.com/${process.env.project_key}/product-projections/search?${options.query}${pagination}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
    .then((res) => {
      console.log(res);

      if (res.status !== 200) {
        showModal('Something went wrong', '');
        return undefined;
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);

      if (data) {
        products = data.results;

        Pages.setLastPage(data.total);
        handleNextButtonState();
      }
    })
    .catch((error) => error);

  return products;
}
