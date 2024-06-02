import { CLASS_NAMES, DOM } from '../../../const';
import { QUERY_BASE } from '../const';

export default function getColorFilterQuery(): string | undefined {
  const colorFilter = DOM.elements[CLASS_NAMES.filterColor];
  const colors: NodeListOf<HTMLInputElement> = colorFilter.querySelectorAll(`input:checked`);

  let queryColor: string | undefined;

  if (colors.length) {
    const array: string[] = [];

    for (let i = 0; i < colors.length; i += 1) {
      if (colors[i].value) array.push(`"${colors[i].value}"`);
    }

    queryColor = `${QUERY_BASE.color}:${array.join(',')}`;
  }

  return queryColor;
}
