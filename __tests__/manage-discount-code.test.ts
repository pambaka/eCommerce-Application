import CartDiscount from '../src/api/manage-discount-code';
import useToken from '../src/services/use-token';
import showModal from '../src/pages/show-modal';
import isTokenActive from '../src/api/is-token-active';

jest.mock('../src/services/use-token');
jest.mock('../src/pages/show-modal');
jest.mock('../src/api/is-token-active');

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('CartDiscount', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('getAccessToken', () => {
    it('should return token if available and active', async () => {
      (useToken.customer.access.get as jest.Mock).mockReturnValue('someToken');
      (isTokenActive as jest.Mock).mockResolvedValue(true);

      const token = await CartDiscount.getAccessToken();
      expect(token).toBe('someToken');
    });

    it('should refresh token if available but not active', async () => {
      (useToken.customer.access.get as jest.Mock).mockReturnValue('someToken');
      (isTokenActive as jest.Mock).mockResolvedValue(false);
      (useToken.customer.refresh.get as jest.Mock).mockReturnValue('refreshToken');
      (useToken.fetchRefreshToken as jest.Mock).mockResolvedValue(undefined);
      (useToken.customer.access.get as jest.Mock).mockReturnValue('newToken');
      const token = await CartDiscount.getAccessToken();
      expect(useToken.fetchRefreshToken).toHaveBeenCalledWith('refreshToken');
      expect(token).toBe('newToken');
    });

    it('should show modal and return undefined if token is not available', async () => {
      (useToken.customer.access.get as jest.Mock).mockReturnValue(undefined);

      const token = await CartDiscount.getAccessToken();
      expect(showModal).toHaveBeenCalledWith('Something went wrong', 'Please try again');
      expect(token).toBeUndefined();
    });

    it('should show modal and return undefined if refresh token is not available', async () => {
      (useToken.customer.access.get as jest.Mock).mockReturnValue('someToken');
      (isTokenActive as jest.Mock).mockResolvedValue(false);
      (useToken.customer.refresh.get as jest.Mock).mockReturnValue(undefined);

      const token = await CartDiscount.getAccessToken();
      expect(showModal).toHaveBeenCalledWith('Something went wrong', 'Please try again');
      expect(token).toBeUndefined();
    });
  });
});
