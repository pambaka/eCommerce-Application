import updateCustomerPassword from '../../../api/update-customer-password';
import CustomerUpdater from '../../../api/update-customer';
import withSpinner from '../../../utils/with-spinner';

export default async function updateCustomerInfo(
  id: string,
  value: string,
  isPassword: boolean = false,
): Promise<boolean> {
  const customerUpdater = new CustomerUpdater();

  try {
    if (isPassword) {
      const [currentPassword, newPassword] = value.split(':');
      await withSpinner(() => updateCustomerPassword(currentPassword, newPassword));
      return true;
    }
    await withSpinner(() => customerUpdater.updateCustomerData(id, value).then(() => {}));
    return true;
  } catch (error) {
    return false;
  }
}
