import updateCustomerFirstName from '../../../api/update-customer-first-name';
import updateCustomerLastName from '../../../api/update-customer-last-name';
import updateCustomerBirthday from '../../../api/update-customer-birthday';
import updateCustomerEmail from '../../../api/update-customer-email';
import { ID_NAMES } from '../../../const';

export default async function updateCustomerInfo(id: string, value: string): Promise<boolean> {
  try {
    if (id === ID_NAMES.customerName) {
      return await updateCustomerFirstName(value);
    }
    if (id === ID_NAMES.customerSurname) {
      return await updateCustomerLastName(value);
    }
    if (id === ID_NAMES.customerEmail) {
      return await updateCustomerEmail(value);
    }
    if (id === ID_NAMES.customerDob) {
      return await updateCustomerBirthday(value);
    }
    throw new Error('Invalid ID');
  } catch (error) {
    console.error('Error updating customer data:', error);
    return false;
  }
}
