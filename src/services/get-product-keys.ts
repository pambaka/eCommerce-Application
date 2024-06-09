import getProducts from '../api/get-products';
import { Product } from '../types/products';
import useToken from './use-token';

export default async function getProductKeys(): Promise<string[]> {
  const keys: string[] = [];

  const token: string | null = await useToken.client.access.get();

  if (token) {
    const products: Product[] | undefined = await getProducts(token);

    if (products) {
      products.forEach((product) => {
        if (product.key) keys.push(product.key);
      });
    }
  }

  return keys;
}
