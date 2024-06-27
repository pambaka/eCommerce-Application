import { CUSTOMER_ACCESS_TOKEN } from '../api/const';

export default function isCustomerAuthorized(): boolean {
  const value = localStorage.getItem(CUSTOMER_ACCESS_TOKEN);

  return Boolean(value);
}
