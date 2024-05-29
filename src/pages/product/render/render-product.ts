import getProductByKey from '../../../api/get-product-by-key';
import BaseComponent from '../../../components/base-component';
import BaseImageComponent from '../../../components/base-image-component';
import BaseTextComponent from '../../../components/base-text-component';
import useToken from '../../../services/use-token';
import { Product } from '../../../types/products';
import assertNonNullable from '../../../utils/assert-non-nullable';
import './product.scss';

export default async function renderProduct(productKey: string) {
  const token = useToken.anonymous.access.get();

  if (token) {
    const product: Product | undefined = await getProductByKey(productKey, token);
    console.log('product', product);
    if (product) {
      const imagesArray = product.masterData.current.masterVariant.images;
      const main = assertNonNullable<HTMLElement>('main');
      main.innerHTML = '';

      const productWrapper = new BaseComponent('div', 'product-wrapper');
      main.append(productWrapper.node);

      const imagesWrapper = new BaseComponent('div', 'images-wrapper');
      const productInfo = new BaseComponent('div', 'product-info');
      productWrapper.node.append(imagesWrapper.node, productInfo.node);

      const mainImageWrapper = new BaseComponent('div', 'main-image-wrapper');
      const mainImage = new BaseImageComponent('product__image', imagesArray[1].url, 'main image');
      mainImageWrapper.node.append(mainImage.node);
      const imageRow = new BaseComponent('div', 'image-row');
      imagesArray.forEach((arrItem) => {
        const smallImageWrapper = new BaseComponent('div', 'small-image-wrapper');
        const anImage = new BaseImageComponent('product__small-image', arrItem.url, 'small-image');
        smallImageWrapper.node.append(anImage.node);
        imageRow.node.append(smallImageWrapper.node);
      });
      imagesWrapper.node.append(mainImageWrapper.node, imageRow.node);

      const productName = new BaseTextComponent('h2', 'product__name', product.masterData.current.name['en-US']);
      const productDescription = new BaseTextComponent(
        'p',
        'product__description',
        product.masterData.current.description['en-US'],
      );
      productInfo.node.append(productName.node, productDescription.node);
    }
  }
}
