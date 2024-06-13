import { AnonymousToken, Token } from '../types/index';
import {
  ANONYMOUS_ACCESS_TOKEN,
  CLIENT_ACCESS_TOKEN,
  CUSTOMER_ACCESS_TOKEN,
  CUSTOMER_REFRESH_TOKEN,
} from '../api/const';
import Customer from '../utils/customer';
import getAnonymousToken from '../api/get-anonymous-tokens';
import getAccessToken from '../api/get-access-token';
import isTokenActive from '../api/is-token-active';
import fetchRefreshToken from '../api/get-refresh-token';

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
          token = localStorage.getItem(CLIENT_ACCESS_TOKEN);
        }

        return token;
      },
    },
  };

  static async getValidToken(): Promise<string | undefined> {
    let token = this.customer.access.get() ?? undefined;
    if (token) {
      const isActive = await isTokenActive(token);
      if (!isActive) {
        const refreshToken = this.customer.refresh.get() ?? undefined;
        if (refreshToken) {
          token = await fetchRefreshToken(refreshToken);
          if (token) {
            this.customer.access.set(token);
          } else {
            Customer.logOut();
            return undefined;
          }
        } else {
          Customer.logOut();
          return undefined;
        }
      }
    } else {
      token = (await this.anonymous.access.get()) ?? undefined;
    }
    return token;
  }
}
