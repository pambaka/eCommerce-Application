import ContainerWithText from '../../../components/container-with-text';
import LabeledCheckbox from '../../../components/labeled-checkbox';
import { CLASS_NAMES, DOM } from '../../../const';
import Catalog from '../../../services/catalog';
import getCategoryNameByKey from '../../../utils/get-category-key-by-name';

export default function renderCategoryFilter(parentElement: HTMLElement): void {
  const categoryFilter = new ContainerWithText(CLASS_NAMES.filterCategory, 'Category: ');

  Object.keys(Catalog.categories).forEach((key) => {
    const checkbox = new LabeledCheckbox(getCategoryNameByKey(key), key);
    categoryFilter.node.append(checkbox.node);
  });

  DOM.add(CLASS_NAMES.filterCategory, categoryFilter.node);

  parentElement.append(categoryFilter.node);
}
