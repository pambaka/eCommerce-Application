import updateCustomerPassword from '../src/api/update-customer-password';
import useToken from '../src/services/use-token';
import getUserInfo from '../src/api/get-user-info';
import showModal from '../src/pages/show-modal';
import getCustomerTokens from '../src/api/get-customer-tokens';

jest.mock('../src/services/use-token');
jest.mock('../src/api/get-user-info');
jest.mock('../src/pages/show-modal');
jest.mock('../src/api/get-customer-tokens');

describe('updateCustomerPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should show modal if access token is missing', async () => {
    (useToken.customer.access.get as jest.Mock).mockReturnValue(null);

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(showModal).toHaveBeenCalledWith('Something went wrong', '', false);
  });

  it('should show modal if customer data is not retrieved', async () => {
    const mockAccessToken = 'mockAccessToken';
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (getUserInfo as jest.Mock).mockResolvedValue(undefined);

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(showModal).toHaveBeenCalledWith('Failed to retrieve customer data', '', false);
  });

  it('should show modal if response is not ok', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockCustomerData = { id: '123', version: 1, email: 'test@example.com' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (getUserInfo as jest.Mock).mockResolvedValue(mockCustomerData);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'The given current password does not match.' }),
      }),
    ) as jest.Mock;

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(showModal).toHaveBeenCalledWith(
      'Failed to update password',
      'The given current password does not match.',
      false,
    );
  });

  it('should show modal if new access token is not retrieved', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockCustomerData = { id: '123', version: 1, email: 'test@example.com' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (getUserInfo as jest.Mock).mockResolvedValue(mockCustomerData);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      }),
    ) as jest.Mock;

    (getCustomerTokens as jest.Mock).mockResolvedValue(null);

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(showModal).toHaveBeenCalledWith('Failed to update password', '', false);
  });

  it('should show success modal if password is updated successfully', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockCustomerData = { id: '123', version: 1, email: 'test@example.com' };
    const mockNewAccessToken = 'newAccessToken';
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (getUserInfo as jest.Mock).mockResolvedValue(mockCustomerData);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      }),
    ) as jest.Mock;

    (getCustomerTokens as jest.Mock).mockResolvedValue(mockNewAccessToken);

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(useToken.customer.access.set).toHaveBeenCalledWith(mockNewAccessToken);
    expect(showModal).toHaveBeenCalledWith('Password was successfully updated', '', true);
  });

  it('should show modal on network error', async () => {
    const mockAccessToken = 'mockAccessToken';
    const mockCustomerData = { id: '123', version: 1, email: 'test@example.com' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue(mockAccessToken);
    (getUserInfo as jest.Mock).mockResolvedValue(mockCustomerData);

    global.fetch = jest.fn(() => Promise.reject(new Error('Failed to fetch'))) as jest.Mock;

    await updateCustomerPassword('currentPassword', 'newPassword');

    expect(showModal).toHaveBeenCalledWith(
      'Failed to update data',
      'Network error, please check your internet connection.',
      false,
    );
  });
});
