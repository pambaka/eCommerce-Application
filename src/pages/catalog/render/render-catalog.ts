import './catalog.scss';
import BaseComponent from '../../../components/base-component';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import { Product } from '../../../types/products';
import getProducts from '../../../api/get-products';
import BaseTextComponent from '../../../components/base-text-component';
import renderTopSection from './render-top-section';
import createCard from './create-card';

export default async function renderCatalog(): Promise<HTMLElement> {
  const catalog = new BaseComponent('div', 'catalog');

  renderTopSection(catalog.node);

  const wrapper = new BaseComponent('section', CLASS_NAMES.productsWrapper);
  DOM.add(CLASS_NAMES.productsWrapper, wrapper.node);

  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    const products: Product[] | undefined = await getProducts(token);

    if (products) {
      for (let i = 0; i < products.length; i += 1) {
        const card = createCard(products[i].key, products[i].masterData.current);

        wrapper.node.append(card);
      }
    } else {
      const p = new BaseTextComponent('p', 'catalog-error', 'Catalog is empty. There are no products here yet.');
      wrapper.node.append(p.node);
    }
  }

  catalog.node.append(wrapper.node);

  return catalog.node;
}
