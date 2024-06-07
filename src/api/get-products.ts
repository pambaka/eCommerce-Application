import showModal from '../pages/show-modal';
import { Product } from '../types/products';
import { region } from './const';

export default async function getProducts(accessToken: string): Promise<Product[] | undefined> {
  let products: Product[] | undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/products`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
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
