import getProducts from '../../../api/get-products';
import BaseTextComponent from '../../../components/base-text-component';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import { Product } from '../../../types/products';
import createCard from './create-card';

export default async function renderAllProducts() {
  const wrapper = DOM.elements[CLASS_NAMES.productsWrapper];

  const token: string | null = await useToken.client.access.get();

  if (token && wrapper) {
    const products: Product[] | undefined = await getProducts(token);

    if (products) {
      for (let i = 0; i < products.length; i += 1) {
        const card = createCard(products[i].key, products[i].masterData.current);

        wrapper.append(card);
      }
    } else {
      const p = new BaseTextComponent('p', 'catalog-error', 'Catalog is empty. There are no products here yet.');
      wrapper.append(p.node);
    }
  }
}
