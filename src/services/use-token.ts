import getAccessToken from '../api/get-access-token';
import getRefreshToken from '../api/get-refresh-token';
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
          const accessToken = token || (await getAccessToken());
          if (accessToken) localStorage.setItem(CUSTOMER_ACCESS_TOKEN, accessToken);
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
          const storedRefreshToken = localStorage.getItem(CUSTOMER_REFRESH_TOKEN);
          const refreshToken = token || (storedRefreshToken ? await getRefreshToken(storedRefreshToken) : undefined);
          if (refreshToken) localStorage.setItem(CUSTOMER_REFRESH_TOKEN, refreshToken);
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
