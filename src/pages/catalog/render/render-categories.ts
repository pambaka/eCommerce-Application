import BaseComponent from '../../../components/base-component';
import Catalog from '../../../services/catalog';
import getCategoryNameByKey from '../../../utils/get-category-key-by-name';
import BaseTextComponent from '../../../components/base-text-component';
import updateCategoryHash from '../logic/update-category-hash';

export default function renderCategories(parentElement: HTMLElement): void {
  const categories = new BaseComponent('div', 'categories');

  Object.keys(Catalog.categories).forEach((key) => {
    const name = getCategoryNameByKey(key);
    const p = new BaseTextComponent('p', '', `${name}`);
    p.node.setAttribute('value', key);
    p.node.addEventListener('click', updateCategoryHash);

    categories.node.append(p.node);
  });

  parentElement.append(categories.node);
}
