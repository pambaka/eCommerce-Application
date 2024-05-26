import { Product } from '../types/index';
import { region } from './const';

export default async function getProductByKey(key: string, accessToken: string): Promise<Product | undefined> {
  let product;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/products/key=${key}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      console.log(res);

      if (res.status !== 200) {
        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      console.log(data);

      product = data;
    })
    .catch((error) => console.log(error));

  return product;
}
