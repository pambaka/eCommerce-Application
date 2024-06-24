import getUserInfo from '../src/api/get-user-info';
import useToken from '../src/services/use-token';
import replaceLocation from '../src/utils/replace-location';
import Router from '../src/services/router';
import Customer from '../src/services/customer';
import showModal from '../src/pages/show-modal';

jest.mock('../src/services/use-token');
jest.mock('../src/utils/replace-location');
jest.mock('../src/utils/customer');
jest.mock('../src/pages/show-modal');

describe('getUserInfo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should redirect to main page if access token is missing', async () => {
    (useToken.customer.access.get as jest.Mock).mockReturnValue(null);

    const result = await getUserInfo();

    expect(replaceLocation).toHaveBeenCalledWith(Router.pages.main);
    expect(result).toBeUndefined();
  });

  it('should log out and redirect if response status is 401', async () => {
    const mockAccessToken = 'mockAccessToken';
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        ok: false,
      }),
    ) as jest.Mock;

    const result = await getUserInfo();

    expect(replaceLocation).toHaveBeenCalledWith(Router.pages.main);
    expect(Customer.logOut).toHaveBeenCalled();
    expect(result).toBeUndefined();
  });

  it('should show modal if response is not ok', async () => {
    const mockAccessToken = 'mockAccessToken';
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        ok: false,
      }),
    ) as jest.Mock;

    const result = await getUserInfo();

    expect(showModal).toHaveBeenCalledWith('Something went wrong!', '');
    expect(result).toBeUndefined();
  });

  it('should return JSON data if response is ok', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockData = { name: 'John Doe' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockData),
      }),
    ) as jest.Mock;

    const result = await getUserInfo();

    expect(result).toEqual(mockData);
  });

  it('should handle fetch errors', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockError = new Error('Network error');
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);

    global.fetch = jest.fn(() => Promise.reject(mockError)) as jest.Mock;

    const result = await getUserInfo();

    expect(result).toBe(mockError);
  });
});
