import ProductCard from '../../../modules/product-card/product-card';
import { CardPrice, ProductData } from '../../../types/products';
import showProduct from '../logic/show-product';

export default function createCard(key: string, productData: ProductData): HTMLElement {
  const title: string = productData.name['en-US'];

  const imageUrl: string = productData.masterVariant.images[0]?.url ?? '';

  const description: string = productData.description?.['en-US'] ?? '';

  const price: CardPrice = { regular: undefined, discounted: undefined };
  price.regular = productData.masterVariant.prices[0]?.value.centAmount ?? 0;
  price.regular /= 100;
  const discounted = productData.masterVariant.prices[0]?.discounted;
  if (discounted) price.discounted = discounted.value.centAmount / 100;

  const card = new ProductCard(title, imageUrl, description, price);
  card.node.setAttribute('key', key);
  card.node.addEventListener('click', showProduct);

  return card.node;
}
