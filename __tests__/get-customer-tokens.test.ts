import { ERROR_MESSAGE } from '../src/api/const';
import getCustomerTokens from '../src/api/get-customer-tokens';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ statusCode: 400, message: ERROR_MESSAGE.notFound }),
  }),
) as jest.Mock;

describe('getCustomerTokens', () => {
  it('show modal window if authentication fails due to incorrect credentials', async () => {
    await getCustomerTokens('email', 'password');

    const modal = document.querySelector('.modal-window');

    expect(modal).toBeTruthy();
  });
});
