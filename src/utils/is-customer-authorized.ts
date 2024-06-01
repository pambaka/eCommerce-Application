export default function isCustomerAuthorized(): boolean {
  const value = localStorage.getItem('isCustomerAuthorized');

  return value === 'true';
}
