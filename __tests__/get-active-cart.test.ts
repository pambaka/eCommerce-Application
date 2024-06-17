import getActiveCart from '../src/api/get-active-cart';
import showModal from '../src/pages/show-modal';

jest.mock('../src/pages/show-modal');

describe('getActiveCart', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should return cart data if response is ok', async () => {
    const mockToken = 'mockToken';
    const mockCartData = { id: 'cart123' };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        json: () => Promise.resolve(mockCartData),
      }),
    ) as jest.Mock;

    const result = await getActiveCart(mockToken);

    expect(result).toEqual(mockCartData);
  });

  it('should show modal if response status is 401 or 403', async () => {
    const mockToken = 'mockToken';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
        ok: false,
      }),
    ) as jest.Mock;

    const result = await getActiveCart(mockToken);

    expect(showModal).toHaveBeenCalledWith('Something went wrong', 'Please try adding the product to the cart again');
    expect(result).toBeUndefined();
  });

  it('should return undefined if response is not ok', async () => {
    const mockToken = 'mockToken';
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
        ok: false,
      }),
    ) as jest.Mock;

    const result = await getActiveCart(mockToken);

    expect(result).toBeUndefined();
  });

  it('should handle fetch error', async () => {
    const mockToken = 'mockToken';
    global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

    const result = await getActiveCart(mockToken);

    expect(result).toBeUndefined();
  });
});
