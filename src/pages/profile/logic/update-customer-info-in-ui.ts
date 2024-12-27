import updateCustomerPassword from '../../../api/update-customer-password';
import CustomerUpdater from '../../../api/update-customer';

export default async function updateCustomerInfo(
  id: string,
  value: string,
  isPassword: boolean = false,
): Promise<boolean> {
  const customerUpdater = new CustomerUpdater();

  try {
    if (isPassword) {
      const [currentPassword, newPassword] = value.split(':');
      await updateCustomerPassword(currentPassword, newPassword);
      return true;
    }
    return await customerUpdater.updateCustomerData(id, value);
  } catch (error) {
    return false;
  }
}
