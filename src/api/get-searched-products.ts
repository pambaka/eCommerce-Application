import showModal from '../pages/show-modal';
import { ProductProjection } from '../types/products';
import { region } from './const';

export default async function getSearchedProducts(
  accessToken: string,
  query: string,
): Promise<ProductProjection[] | undefined> {
  let products: ProductProjection[] | undefined;

  await fetch(
    `https://api.${region}.commercetools.com/${process.env.project_key}/product-projections/search?${query}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  )
    .then((res) => {
      // console.log(res);

      if (res.status !== 200) {
        showModal('Something went wrong', '');
        return undefined;
      }
      return res.json();
    })
    .then((data) => {
      // console.log(data);

      if (data) {
        products = data.results;
      }
    })
    .catch((error) => error);

  return products;
}
