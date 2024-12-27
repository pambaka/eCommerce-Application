import ContainerWithText from '../../../components/container-with-text';
import LabeledCheckbox from '../../../components/labeled-checkbox';
import { CLASS_NAMES, DOM } from '../../../const';
import { PRODUCT_COLORS } from '../const';

export default function renderColorFilter(parentElement: HTMLElement): void {
  const colorFilter = new ContainerWithText(CLASS_NAMES.filterColor, 'Color: ');

  PRODUCT_COLORS.forEach((color) => {
    const checkbox = new LabeledCheckbox(color, color);
    colorFilter.node.append(checkbox.node);
  });

  DOM.add(CLASS_NAMES.filterColor, colorFilter.node);

  parentElement.append(colorFilter.node);
}
