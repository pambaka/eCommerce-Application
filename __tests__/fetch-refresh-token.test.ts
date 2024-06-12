import useToken from '../src/services/use-token';
import showModal from '../src/pages/show-modal';
import { CUSTOMER_ACCESS_TOKEN, region, oauth } from '../src/api/const';
import Customer from '../src/utils/customer';

jest.mock('../src/pages/show-modal');
jest.mock('../src/utils/customer');
global.fetch = jest.fn();

describe('useToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('fetchRefreshToken', () => {
    it('should set new access token if refresh token is valid', async () => {
      const mockAccessToken = 'newAccessToken';
      const mockResponse = {
        access_token: mockAccessToken,
      };

      (fetch as jest.Mock).mockResolvedValue({
        status: 200,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const refreshToken = 'validRefreshToken';
      await useToken.fetchRefreshToken(refreshToken);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://auth.${region}.${oauth}/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
        ),
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      expect(localStorage.getItem(CUSTOMER_ACCESS_TOKEN)).toBe(mockAccessToken);
    });

    it('should show modal if refresh token is invalid', async () => {
      const mockResponse = {
        access_token: null,
      };

      (fetch as jest.Mock).mockResolvedValue({
        status: 400,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const refreshToken = 'invalidRefreshToken';
      await useToken.fetchRefreshToken(refreshToken);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://auth.${region}.${oauth}/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
        ),
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${btoa(`${process.env.client_id}:${process.env.secret}`)}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      expect(showModal).toHaveBeenCalledWith('Something went wrong', 'Please try again');
      expect(localStorage.getItem(CUSTOMER_ACCESS_TOKEN)).toBeNull();
    });

    it('should log out customer if refresh token is missing or invalid', async () => {
      const mockResponse = {
        access_token: null,
      };

      (fetch as jest.Mock).mockResolvedValue({
        status: 400,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const refreshToken = 'invalidRefreshToken';
      await useToken.fetchRefreshToken(refreshToken);

      expect(Customer.logOut).toHaveBeenCalled();
    });
  });
});
