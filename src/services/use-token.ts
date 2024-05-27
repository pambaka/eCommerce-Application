import getAccessToken from '../api/get-access-token';
import { Token } from '../types/index';
import fetchPasswordToken from '../api/auth-api';
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
    fetchPasswordToken: (email: string, password: string) => Promise<number>;
  } = {
    access: {
      set: async (token?: string) => {
        try {
          if (token) localStorage.setItem(CUSTOMER_ACCESS_TOKEN, token);
        } catch (error) {
          console.error('Error setting customer access token:', error);
        }
      },
      get: () => localStorage.getItem(CUSTOMER_ACCESS_TOKEN),
    },
    refresh: {
      set: async (token?: string) => {
        try {
          if (token) localStorage.setItem(CUSTOMER_REFRESH_TOKEN, token);
        } catch (error) {
          console.error('Error setting customer refresh token:', error);
        }
      },
      get: () => localStorage.getItem(CUSTOMER_REFRESH_TOKEN),
    },
    fetchPasswordToken,
  };
  // static customer: {
  //   access: Token;
  //   refresh: Token;
  // } = {
  //   access: {
  //     set: async (accessToken) => {
  //       if (accessToken) localStorage.setItem(CUSTOMER_ACCESS_TOKEN, accessToken);
  //     },
  //     get: () => localStorage.getItem(CUSTOMER_ACCESS_TOKEN),
  //   },
  //   refresh: {
  //     set: async (accessToken) => {
  //       if (accessToken) localStorage.setItem(CUSTOMER_REFRESH_TOKEN, accessToken);
  //     },
  //     get: () => localStorage.getItem(CUSTOMER_REFRESH_TOKEN),
  //   },
  // };
}
