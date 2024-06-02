import ContainerWithText from '../../../components/container-with-text';
import LabeledCheckbox from '../../../components/labeled-checkbox';
import { CLASS_NAMES, DOM } from '../../../const';
import { CATEGORIES } from '../const';

export default function renderCategoryFilter(parentElement: HTMLElement): void {
  const categoryFilter = new ContainerWithText(CLASS_NAMES.filterCategory, 'Category: ');

  Object.keys(CATEGORIES).forEach((category) => {
    const checkbox = new LabeledCheckbox(category, category);
    categoryFilter.node.append(checkbox.node);
  });

  DOM.add(CLASS_NAMES.filterCategory, categoryFilter.node);

  parentElement.append(categoryFilter.node);
}
