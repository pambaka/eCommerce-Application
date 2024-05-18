import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import OptionComponent from '../../../components/option-component';
import { CLASS_NAMES } from '../../../const';

export default function renderSelectCountries(parentElement: HTMLElement) {
  const countryWrapper = new BaseComponent('div', 'registration__country-wrapper');
  countryWrapper.node.classList.add('col-md-6');
  const countryTitle = new BaseTextComponent('p', 'registration__country-title', 'Country *');
  countryWrapper.node.append(countryTitle.node);

  const countrySelect = new BaseComponent('select', CLASS_NAMES.country);
  countrySelect.node.setAttribute('name', 'country');

  const optionFrance = new OptionComponent('France', 'FR');
  const optionGermany = new OptionComponent('Germany', 'DE');
  const optionSpain = new OptionComponent('Spain', 'ES');
  countrySelect.node.append(optionFrance.node, optionGermany.node, optionSpain.node);

  countryWrapper.node.append(countrySelect.node);
  parentElement.append(countryWrapper.node);
}
