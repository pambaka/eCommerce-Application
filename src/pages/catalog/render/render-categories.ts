import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import getCategoryKeys from '../../../services/get-category-keys';
import useToken from '../../../services/use-token';
import { BREADCRUMBS_NAMES } from '../const';
import updateCategoryHash from '../logic/update-category-hash';

export default async function renderCategories(parentElement: HTMLElement) {
  const categories = new BaseComponent('div', 'categories');

  const token = await useToken.anonymous.access.get();

  if (token) {
    const categoryKeys = await getCategoryKeys();

    for (let i = 0; i < categoryKeys.length; i += 1) {
      const p = new BaseTextComponent('p', '', `${BREADCRUMBS_NAMES[categoryKeys[i]]}`);
      p.node.setAttribute('value', categoryKeys[i]);
      p.node.addEventListener('click', updateCategoryHash);

      categories.node.append(p.node);
    }
  }

  parentElement.append(categories.node);
}
