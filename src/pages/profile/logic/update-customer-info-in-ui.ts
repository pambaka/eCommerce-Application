import updateCustomerFirstName from '../../../api/update-customer-first-name';
import updateCustomerLastName from '../../../api/update-customer-last-name';
import updateCustomerBirthday from '../../../api/update-customer-birthday';
import updateCustomerEmail from '../../../api/update-customer-email';
import { ID_NAMES } from '../../../const';

export default async function updateCustomerInfo(id: string, value: string): Promise<void> {
  try {
    if (id === ID_NAMES.customerName) {
      await updateCustomerFirstName(value);
    } else if (id === ID_NAMES.customerSurname) {
      await updateCustomerLastName(value);
    } else if (id === ID_NAMES.customerEmail) {
      await updateCustomerEmail(value);
    } else if (id === ID_NAMES.customerDob) {
      await updateCustomerBirthday(value);
    } else {
      throw new Error('Invalid ID');
    }
  } catch (error) {
    console.error('Error updating customer data:', error);
  }
}
