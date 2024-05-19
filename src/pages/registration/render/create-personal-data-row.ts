import BaseComponent from '../../../components/base-component';
import { CLASS_NAMES } from '../../../const';
import inputModule from '../../../modules/input-module';

export default function createPersonalDataRow() {
  const row = new BaseComponent('div', 'row');
  const firstNameModule = inputModule(CLASS_NAMES.firstName, 'text', 'First name *');
  firstNameModule.classList.add('col-md-4');
  const lastNameModule = inputModule(CLASS_NAMES.lastName, 'text', 'Last name *');
  lastNameModule.classList.add('col-md-5');
  const birthDateModule = inputModule(CLASS_NAMES.birthDate, 'date', 'Date of birth *');
  birthDateModule.classList.add('col-md-3');
  row.node.append(firstNameModule, lastNameModule, birthDateModule);

  return row.node;
}
