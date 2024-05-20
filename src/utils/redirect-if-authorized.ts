import Router from '../services/router';
import isCustomerAuthorized from './is-customer-authorized';

export default function redirectIfAuthorized(currentRoute: string): boolean {
  if (isCustomerAuthorized() && currentRoute !== Router.pages.main) {
    window.history.replaceState(null, '', Router.pages.main);
    window.dispatchEvent(new Event('hashchange'));
    return true;
  }
  return false;
}
