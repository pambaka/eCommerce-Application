import './catalog.scss';
import BaseComponent from '../../../components/base-component';
import useToken from '../../../services/use-token';
import { CardPrice, Product } from '../../../types/index';
import getProducts from '../../../api/get-products';
import ProductCard from '../../../modules/product-card/product-card';
import BaseTextComponent from '../../../components/base-text-component';

export default async function renderCatalog(): Promise<HTMLElement> {
  const wrapper = new BaseComponent('div', 'catalog-wrapper');

  const token: string | null = useToken.anonymous.access.get();

  if (token) {
    const products: Product[] | undefined = await getProducts(token);

    if (products) {
      for (let i = 0; i < products.length; i += 1) {
        const currentProduct = products[i].masterData.current;

        const title: string = currentProduct.name['en-US'];

        const description: string = currentProduct.description?.['en-US'] ?? '';

        const imageUrl: string = currentProduct.masterVariant.images[0]?.url ?? '';

        const price: CardPrice = { regular: undefined, discounted: undefined };
        price.regular = currentProduct.masterVariant.prices[0]?.value.centAmount ?? 0;
        price.regular /= 100;
        const discounted = currentProduct.masterVariant.prices[0]?.discounted;
        if (discounted) price.discounted = discounted.value.centAmount / 100;

        const card = new ProductCard(title, imageUrl, description, price);

        wrapper.node.append(card.node);
      }
    } else {
      const p = new BaseTextComponent('p', 'catalog-error', 'Catalog is empty. There are no products here yet.');
      wrapper.node.append(p.node);
    }
  }

  return wrapper.node;
}
