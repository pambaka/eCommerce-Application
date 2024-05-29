import getAccessToken from '../api/get-access-token';
import { Token } from '../types/index';
import { ANONYMOUS_ACCESS_TOKEN, CUSTOMER_ACCESS_TOKEN, CUSTOMER_REFRESH_TOKEN } from '../api/const';

export default class useToken {
  static anonymous: {
    access: Token;
  } = {
    access: {
      set: async () => {
        try {
          const token = await getAccessToken();
          if (token) localStorage.setItem(ANONYMOUS_ACCESS_TOKEN, token);
        } catch (error) {
          console.error('Error setting anonymous access token:', error);
        }
      },
      get: () => localStorage.getItem(ANONYMOUS_ACCESS_TOKEN),
    },
  };

  static customer: {
    access: Token;
    refresh: Token;
  } = {
    access: {
      set: async (token?: string) => {
        try {
          if (token) localStorage.setItem(CUSTOMER_ACCESS_TOKEN, token);
        } catch (error) {
          console.error('Error setting customer access token:', error);
        }
      },
      get: () => {
        const token = localStorage.getItem(CUSTOMER_ACCESS_TOKEN);
        if (!token) {
          console.error('Customer access token is missing or invalid.');
        }
        return token;
      },
    },
    refresh: {
      set: async (token?: string) => {
        try {
          if (token) localStorage.setItem(CUSTOMER_REFRESH_TOKEN, token);
        } catch (error) {
          console.error('Error setting customer refresh token:', error);
        }
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
}
