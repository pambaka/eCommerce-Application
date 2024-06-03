import CustomerUpdater from '../../../api/update-customer';

export default async function updateCustomerInfo(id: string, value: string): Promise<boolean> {
  const customerUpdater = new CustomerUpdater();

  try {
    return await customerUpdater.updateCustomerData(id, value);
  } catch (error) {
    return false;
  }
}
