export default function isCustomerAuthorized(): boolean {
  const value = sessionStorage.getItem('isCustomerAuthorized');

  return value === 'true';
}
