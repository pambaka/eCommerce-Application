import BaseComponent from '../../../components/base-component';
import OptionComponent from '../../../components/option-component';

export default function renderSelectCountries(parentElement: HTMLElement) {
  const countryWrapper = new BaseComponent('div', 'registration__country-wrapper');
  const countryTitle = new BaseComponent('div', 'registration__country-title');
  countryTitle.node.innerText = 'Country *';
  countryWrapper.node.append(countryTitle.node);

  const countrySelect = new BaseComponent('select', 'registration__country-select');
  countrySelect.node.setAttribute('name', 'country');

  const optionFrance = new OptionComponent('France', 'France');
  const optionGermany = new OptionComponent('Germany', 'Germany');
  const optionSpain = new OptionComponent('Spain', 'Spain');
  countrySelect.node.append(optionFrance.node, optionGermany.node, optionSpain.node);

  countryWrapper.node.append(countrySelect.node);
  parentElement.append(countryWrapper.node);
}
