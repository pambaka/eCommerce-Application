import getUserInfo from '../src/api/get-user-info';
import useToken from '../src/services/use-token';
import replaceLocation from '../src/utils/replace-location';
import Router from '../src/services/router';
import Customer from '../src/utils/customer';
import isTokenActive from '../src/api/is-token-active';

jest.mock('../src/services/use-token');
jest.mock('../src/utils/replace-location');
jest.mock('../src/utils/customer');
jest.mock('../src/api/is-token-active');

describe('getUserInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should log out and redirect if refresh token is missing', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockRefreshToken = null;

    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (useToken.customer.refresh.get as jest.Mock).mockReturnValue(mockRefreshToken);
    (isTokenActive as jest.Mock).mockResolvedValue(false);

    await getUserInfo();

    expect(isTokenActive).toHaveBeenCalledWith(mockAccessToken);
    expect(replaceLocation).toHaveBeenCalledWith(Router.pages.main);
    expect(Customer.logOut).toHaveBeenCalled();
  });
});
