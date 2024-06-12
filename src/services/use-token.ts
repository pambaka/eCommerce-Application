import { AnonymousToken, Token } from '../types/index';
import {
  ANONYMOUS_ACCESS_TOKEN,
  CLIENT_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  CUSTOMER_REFRESH_TOKEN,
  region,
  oauth,
} from '../api/const';
import Customer from '../utils/customer';
import getAnonymousToken from '../api/get-anonymous-tokens';
import getAccessToken from '../api/get-access-token';
import isTokenActive from '../api/is-token-active';
import showModal from '../pages/show-modal';

export default class useToken {
  static anonymous: { access: AnonymousToken } = {
    access: {
      set: async () => {
        const token = await getAnonymousToken();
        if (token) localStorage.setItem(ANONYMOUS_ACCESS_TOKEN, token);
      },
      get: async () => {
        let token = localStorage.getItem(ANONYMOUS_ACCESS_TOKEN);
        let isActive = false;

        if (token) {
          isActive = await isTokenActive(token);
          console.log('is anonymous token active', isActive);
        }

        if (!token || !isActive) {
          await this.anonymous.access.set();
          token = localStorage.getItem(ANONYMOUS_ACCESS_TOKEN);
        }

        return token;
      },
    },
  };

  static customer: { access: Token; refresh: Token } = {
    access: {
      set: (token: string) => {
        localStorage.setItem(CUSTOMER_ACCESS_TOKEN, token);
      },
      get: () => {
        const token = localStorage.getItem(CUSTOMER_ACCESS_TOKEN);

        if (!token) {
          Customer.logOut();
        }

        return token;
      },
    },
    refresh: {
      set: (token: string) => {
        localStorage.setItem(CUSTOMER_REFRESH_TOKEN, token);
      },
      get: () => {
        const token = localStorage.getItem(CUSTOMER_REFRESH_TOKEN);
        if (!token) {
          console.error('Customer refresh token is missing or invalid.');
        }
        return token;
      },
    },
  };

  static access = {
    async get() {
      let token = useToken.customer.access.get();
      console.log('customer', token);

      if (!token) {
        token = await useToken.anonymous.access.get();
        console.log('anonymous', token);
      }

      return token;
    },
  };

  static client: { access: AnonymousToken } = {
    access: {
      set: async () => {
        const token = await getAccessToken();
        if (token) localStorage.setItem(CLIENT_ACCESS_TOKEN, token);
      },
      get: async () => {
        let token = localStorage.getItem(CLIENT_ACCESS_TOKEN);

        if (!token) {
          await this.client.access.set();
          token = localStorage.getItem(ANONYMOUS_ACCESS_TOKEN);
        }

        return token;
      },
    },
  };

  static async fetchRefreshToken(refreshToken: string): Promise<void> {
    const url = `https://auth.${region}.${oauth}/token?grant_type=refresh_token&refresh_token=${refreshToken}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const data = await response.json();
    const accessToken = data.access_token;
    if (accessToken) {
      this.customer.access.set(accessToken);
    } else {
      showModal('Something went wrong', 'Please log in again');
      // Customer.logOut();
    }
  }
}
