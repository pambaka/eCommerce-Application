import { CUSTOMER_ACCESS_TOKEN, CUSTOMER_REFRESH_TOKEN } from '../api/const';
import { dispatchAuthorizationChangeEvent } from './authorization-event';
import Counter from '../services/counter';

export default class Customer {
  static logIn(username?: string) {
    if (username) localStorage.setItem('userName', username);

    dispatchAuthorizationChangeEvent(true);
  }

  static async logOut() {
    localStorage.removeItem('isCustomerAuthorized');

    localStorage.removeItem(CUSTOMER_ACCESS_TOKEN);
    localStorage.removeItem(CUSTOMER_REFRESH_TOKEN);

    await Counter.update(true);

    dispatchAuthorizationChangeEvent(false);
  }
}
