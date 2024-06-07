import { ProductProjection } from '../types/products';
import { region } from './const';
import showModal from '../pages/show-modal';

export default async function getSortedProducts(
  accessToken: string,
  sortingOrder: string,
): Promise<ProductProjection[] | undefined> {
  let products: ProductProjection[] | undefined;

  await fetch(
    `https://api.${region}.commercetools.com/${process.env.project_key}/product-projections/search?sort=${sortingOrder}`,
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
        showModal('Something went wrong', 'Please keep calm and try reloading the page');
      }

      return res.json();
    })
    .then((data) => {
      // console.log(data);
      products = data.results;
    })
    .catch((error) => error);

  return products;
}
