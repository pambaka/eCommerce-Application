import BaseComponent from '../../../components/base-component';

export default function renderSelectCountries(parentElement: HTMLElement) {
  const countryWrapper = new BaseComponent('div', 'registration__country-wrapper');
  const countryTitle = new BaseComponent('div', 'registration__country-title');
  countryTitle.node.innerText = 'Country *';
  countryWrapper.node.append(countryTitle.node);

  const countrySelect = new BaseComponent('select', 'registration__country-select');
  countrySelect.node.setAttribute('name', 'country');

  const optionFrance = new BaseComponent('option');
  optionFrance.node.setAttribute('value', 'France');
  optionFrance.node.innerText = 'France';
  countrySelect.node.append(optionFrance.node);

  const optionGermany = new BaseComponent('option');
  optionGermany.node.setAttribute('value', 'Germany');
  optionGermany.node.innerText = 'Germany';
  countrySelect.node.append(optionGermany.node);

  const optionSpain = new BaseComponent('option');
  optionSpain.node.setAttribute('value', 'Spain');
  optionSpain.node.innerText = 'Spain';
  countrySelect.node.append(optionSpain.node);

  countryWrapper.node.append(countrySelect.node);
  parentElement.append(countryWrapper.node);
}
