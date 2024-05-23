import getAccessToken from '../api/get-access-token';
import { Token } from '../types/index';

const ANONYMOUS_ACCESS_TOKEN = 'anonymousAccessToken' as const;
// const CUSTOMER_ACCESS_TOKEN = 'customerAccessToken' as const;
// const CUSTOMER_REFRESH_TOKEN = 'customerRefreshToken' as const;

export default class useToken {
  static anonymous: {
    access: Token;
  } = {
    access: {
      set: async () => {
        const token = await getAccessToken();
        if (token) localStorage.setItem(ANONYMOUS_ACCESS_TOKEN, token);
      },
      get: () => localStorage.getItem(ANONYMOUS_ACCESS_TOKEN),
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
