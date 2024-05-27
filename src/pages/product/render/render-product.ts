import getProductByKey from '../../../api/get-product-by-key';
import useToken from '../../../services/use-token';
import { Product } from '../../../types/products';

export default async function renderProduct(productKey: string) {
  const token = useToken.anonymous.access.get();

  if (token) {
    const product: Product | undefined = await getProductByKey(productKey, token);
    console.log('product', product);
  }
}
