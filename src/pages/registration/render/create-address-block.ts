import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import { CLASS_NAMES } from '../../../const';
import inputModule from '../../../modules/input-module';
import renderSelectCountries from './render-select-coutries';

export default function createAddressBlock(): HTMLElement {
  const addressBlock = new BaseComponent('fieldset', CLASS_NAMES.address);
  const title = new BaseTextComponent('legend', '', 'Shipping address');

  const innerRow1 = new BaseComponent('div', 'row');
  const postalCodeModule = inputModule(CLASS_NAMES.postalCode, 'text', 'Postal code *');
  postalCodeModule.classList.add('col-md-6');

  renderSelectCountries(innerRow1.node);

  innerRow1.node.append(postalCodeModule);

  const innerRow2 = new BaseComponent('div', 'row');
  const streetModule = inputModule(CLASS_NAMES.street, 'text', 'Street *');
  streetModule.classList.add('col-md-6');

  const cityModule = inputModule(CLASS_NAMES.city, 'text', 'City *');
  cityModule.classList.add('col-md-6');

  innerRow2.node.append(streetModule, cityModule);
  addressBlock.node.append(title.node, innerRow1.node, innerRow2.node);

  return addressBlock.node;
}
