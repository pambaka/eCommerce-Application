import { ID_NAMES } from '../../../const';
import CustomerUpdater from '../../../api/update-customer';

export default async function updateCustomerInfo(id: string, value: string): Promise<boolean> {
  const customerUpdater = new CustomerUpdater();

  try {
    let action: string;

    switch (id) {
      case ID_NAMES.customerName:
        action = 'setFirstName';
        break;
      case ID_NAMES.customerSurname:
        action = 'setLastName';
        break;
      case ID_NAMES.customerEmail:
        action = 'changeEmail';
        break;
      case ID_NAMES.customerDob:
        action = 'setDateOfBirth';
        break;
      default:
        throw new Error('Invalid ID');
    }

    return await customerUpdater.updateCustomerData(action, value);
  } catch (error) {
    return false;
  }
}
