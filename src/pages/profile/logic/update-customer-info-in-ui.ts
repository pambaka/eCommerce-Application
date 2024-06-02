import { ID_NAMES } from '../../../const';
import CustomerUpdater from '../../../api/update-customer';

export default async function updateCustomerInfo(id: string, value: string): Promise<boolean> {
  const customerUpdater = new CustomerUpdater();

  try {
    switch (id) {
      case ID_NAMES.customerName:
        return await customerUpdater.updateCustomerFirstName(value);
      case ID_NAMES.customerSurname:
        return await customerUpdater.updateCustomerLastName(value);
      case ID_NAMES.customerEmail:
        return await customerUpdater.updateCustomerEmail(value);
      case ID_NAMES.customerDob:
        return await customerUpdater.updateCustomerBirthday(value);
      default:
        throw new Error('Invalid ID');
    }
  } catch (error) {
    console.error('Error updating customer data:', error);
    return false;
  }
}
