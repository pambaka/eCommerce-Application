import CustomerUpdater from '../src/api/update-customer';
import useToken from '../src/services/use-token';
import getUserInfo from '../src/api/get-user-info';
import showModal from '../src/pages/show-modal';

jest.mock('../src/services/use-token');
jest.mock('../src/api/get-user-info');
jest.mock('../src/pages/show-modal');

describe('CustomerUpdater', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return null if access token is missing', async () => {
    (useToken.customer.access.get as jest.Mock).mockReturnValue(null);

    const updater = new CustomerUpdater();
    const result = await updater.fetchCustomerData();

    expect(result).toBeNull();
  });

  it('should return customer data from localStorage if available', async () => {
    const mockCustomerData = { id: '123', name: 'John Doe' };
    localStorage.setItem('customerData', JSON.stringify(mockCustomerData));
    (useToken.customer.access.get as jest.Mock).mockReturnValue('mockAccessToken');

    const updater = new CustomerUpdater();
    const result = await updater.fetchCustomerData();

    expect(result).toEqual(mockCustomerData);
  });

  it('should fetch and return customer data if not in localStorage', async () => {
    const mockCustomerData = { id: '123', name: 'John Doe' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue('mockAccessToken');

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCustomerData),
      }),
    ) as jest.Mock;

    const updater = new CustomerUpdater();
    const result = await updater.fetchCustomerData();

    expect(result).toEqual(mockCustomerData);
    expect(localStorage.getItem('customerData')).toEqual(JSON.stringify(mockCustomerData));
  });

  it('should return null if fetch fails', async () => {
    (useToken.customer.access.get as jest.Mock).mockReturnValue('mockAccessToken');

    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    const updater = new CustomerUpdater();
    const result = await updater.fetchCustomerData();

    expect(result).toBeNull();
    expect(showModal).toHaveBeenCalledWith('Failed to update customer data', 'Something went wrong...', false);
  });

  it('should update customer data and show success modal', async () => {
    const mockCustomerData = { id: '123', version: 1, email: 'test@example.com' };
    (useToken.customer.access.get as jest.Mock).mockReturnValue('mockAccessToken');
    (getUserInfo as jest.Mock).mockResolvedValue(mockCustomerData);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      }),
    ) as jest.Mock;

    const updater = new CustomerUpdater();
    const result = await updater.updateCustomerData('email', 'newemail@example.com');

    expect(result).toBe(true);
    expect(showModal).toHaveBeenCalledWith('Successfully updated to newemail@example.com!', '', true);
  });

  it('should handle error when updating customer data', async () => {
    (useToken.customer.access.get as jest.Mock).mockReturnValue('mockAccessToken');
    (getUserInfo as jest.Mock).mockResolvedValue({ id: '123', version: 1 });

    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    const updater = new CustomerUpdater();
    const result = await updater.updateCustomerData('email', 'newemail@example.com');

    expect(result).toBe(false);
    expect(showModal).toHaveBeenCalledWith('Failed to update customer data', 'Something went wrong...', false);
  });
});
