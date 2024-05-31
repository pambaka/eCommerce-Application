import getSearchedProducts from '../../../api/get-searched-products';
import BaseTextComponent from '../../../components/base-text-component';
import { CLASS_NAMES, DOM } from '../../../const';
import useToken from '../../../services/use-token';
import createCard from '../render/create-card';
import getCategoryFilterQuery from './get-category-filter-query';
import getColorFilterQuery from './get-color-filter-query';
import getPriceFilterQuery from './get-price-filter-query';

export default async function filterProducts(event: Event): Promise<void> {
  event.preventDefault();

  const queries: string[] = [];

  const queryPrice = getPriceFilterQuery();
  if (queryPrice) queries.push(queryPrice);

  const queryColor = getColorFilterQuery();
  if (queryColor) queries.push(queryColor);

  const queryCategory = getCategoryFilterQuery();
  if (queryCategory) queries.push(queryCategory);

  const token = useToken.anonymous.access.get();
  if (token) {
    const products = await getSearchedProducts(token, queries.join('&'));

    if (products) {
      const wrapper = DOM.elements[CLASS_NAMES.productsWrapper];
      wrapper.innerHTML = '';

      if (products.length === 0) {
        const text = new BaseTextComponent('p', 'catalog-error', 'Nothing was found');
        wrapper.append(text.node);

        return;
      }

      for (let i = 0; i < products.length; i += 1) {
        const card = createCard(products[i].key, products[i]);
        wrapper.append(card);
      }
    }
  }
}
