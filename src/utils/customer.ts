import { CUSTOMER_ACCESS_TOKEN, CUSTOMER_REFRESH_TOKEN } from '../api/const';
import { dispatchAuthorizationChangeEvent } from './authorization-event';

export default class Customer {
  static logIn(username?: string) {
    localStorage.setItem('isCustomerAuthorized', 'true');

    if (username) localStorage.setItem('userName', username);

    dispatchAuthorizationChangeEvent(true);
  }

  static logOut() {
    localStorage.removeItem('isCustomerAuthorized');

    localStorage.removeItem(CUSTOMER_ACCESS_TOKEN);
    localStorage.removeItem(CUSTOMER_REFRESH_TOKEN);

    dispatchAuthorizationChangeEvent(false);
  }
}
