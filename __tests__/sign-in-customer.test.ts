import signInCustomer from '../src/api/sign-in-customer';
import Router from '../src/services/router';
import isCustomerAuthorized from '../src/utils/is-customer-authorized';

let token: string | undefined;

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve(''),
  }),
) as jest.Mock;

jest.mock('../src/api/get-customer-tokens', () =>
  jest.fn().mockImplementation(() => {
    token = Math.random() < 0.5 ? 'someToken' : undefined;
    return token;
  }),
);

describe('signInCustomer', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it(`customer is authorized only if token is received`, async () => {
    await signInCustomer('email', 'password');

    if (token) {
      expect(isCustomerAuthorized()).toBeTruthy();
      expect(window.location.hash).toBe(Router.pages.main);
    } else {
      expect(isCustomerAuthorized()).toBeFalsy();
    }

    console.log(`Token is ${token}, customer is authorized: ${isCustomerAuthorized()}`);
  });
});
