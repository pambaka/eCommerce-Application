import getProductByKey from '../../../api/get-product-by-key';
import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import useToken from '../../../services/use-token';
import { Product } from '../../../types/products';
import assertNonNullable from '../../../utils/assert-non-nullable';
import createImages from './create-images';
import createPrices from './create-prices';
import './product.scss';

export default async function renderProduct(productKey: string) {
  const token = await useToken.anonymous.access.get();

  if (token) {
    const product: Product | undefined = await getProductByKey(productKey, token);
    console.log('product', product);
    if (product) {
      const main = assertNonNullable<HTMLElement>('main');
      main.innerHTML = '';

      const productWrapper = new BaseComponent('div', 'product-wrapper');
      main.append(productWrapper.node);

      const imagesWrapper = new BaseComponent('div', 'images-wrapper');
      createImages(imagesWrapper.node, product);
      const productInfo = new BaseComponent('div', 'product-info');
      productWrapper.node.append(imagesWrapper.node, productInfo.node);

      const productName = new BaseTextComponent('h2', 'product__name', product.masterData.current.name['en-US']);
      const productDescription = new BaseTextComponent(
        'p',
        'product__description',
        product.masterData.current.description['en-US'],
      );

      const pricesWrapper = new BaseComponent('div', 'price-wrapper');
      createPrices(pricesWrapper.node, product);

      productInfo.node.append(productName.node, productDescription.node, pricesWrapper.node);
    }
  }
}
