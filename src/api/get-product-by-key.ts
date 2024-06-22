import { Successful } from '../types';
import { Product } from '../types/products';
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
      if (res.status !== Successful.ok) {
        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      product = data;
    })
    .catch((error) => error);

  return product;
}
