import OptionComponent from '../../../components/option-component';

export default function renderSelectCountriesInProfile(parentElement: HTMLSelectElement) {
  const optionFrance = new OptionComponent('France', 'FR');
  const optionGermany = new OptionComponent('Germany', 'DE');
  const optionSpain = new OptionComponent('Spain', 'ES');
  parentElement.append(optionFrance.node, optionGermany.node, optionSpain.node);
}
