import { Product } from '../types/products';
import { region } from './const';
import withSpinner from '../utils/with-spinner';

export default async function getProductByKey(key: string, accessToken: string): Promise<Product | undefined> {
  return withSpinner(async () => {
    let product;

    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/products/key=${key}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          return undefined;
        }

        return res.json();
      })
      .then((data) => {
        product = data;
      })
      .catch((error) => error);

    return product;
  }) as unknown as Product | undefined;
}
