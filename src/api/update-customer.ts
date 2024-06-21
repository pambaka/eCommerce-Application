import { region } from './const';
import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';
import { AddressAction, FetchUpdateResponse } from '../types/addresses';
import { Address, CustomerIncomeData } from '../types/index';
import withSpinner from '../utils/with-spinner';

export default class CustomerUpdater {
  private accessToken: string | null;

  constructor() {
    this.accessToken = useToken.customer.access.get();
  }

  public async fetchCustomerData(): Promise<CustomerIncomeData | null> {
    if (!this.accessToken) {
      return null;
    }

    const savedCustomerData = localStorage.getItem('customerData');
    if (savedCustomerData) {
      return JSON.parse(savedCustomerData);
    }

    const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        return null;
      }

      const customerData: CustomerIncomeData = await response.json();
      localStorage.setItem('customerData', JSON.stringify(customerData));
      return customerData;
    } catch (error) {
      CustomerUpdater.handleError(error);
      return null;
    }
  }

  public async fetchUpdate(requestBody: object): Promise<FetchUpdateResponse | null> {
    if (!this.accessToken) {
      return null;
    }

    const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody: FetchUpdateResponse = await response.json();

      if (!response.ok) {
        showModal('Failed to update customer data', 'Unknown error', false);
        return null;
      }

      localStorage.setItem('customerData', JSON.stringify(responseBody));

      return responseBody;
    } catch (error) {
      CustomerUpdater.handleError(error);
      return null;
    }
  }

  public async updateCustomerData(field: string, value: string): Promise<boolean> {
    try {
      const action = field === 'email' ? 'changeEmail' : `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
      const customerData = await getUserInfo();
      const requestBody = {
        version: customerData?.version,
        actions: [
          {
            action,
            [field]: value,
          },
        ],
      };

      const success = await this.fetchUpdate(requestBody);

      if (success) {
        showModal(`Successfully updated to ${value}!`, '', true);
      }

      return !!success;
    } catch (error) {
      CustomerUpdater.handleError(error);
      return false;
    }
  }

  public async updateAddress(
    action: AddressAction,
    addressIdOrKey: string | undefined,
    address?: Address,
    index?: number,
  ): Promise<boolean> {
    return withSpinner(async () => {
      try {
        const customerData = await getUserInfo();
        if (customerData) {
          const requestBody: { version: number; actions: object[] } = {
            version: customerData.version,
            actions: [
              {
                action,
                ...(action === 'removeAddress' ? { addressId: addressIdOrKey } : { addressId: addressIdOrKey }),
                ...(address ? { address } : {}),
              },
            ],
          };

          const response = await this.fetchUpdate(requestBody);

          if (response) {
            if (action === 'addAddress' && response.addresses) {
              const newAddress = response.addresses[response.addresses.length - 1];
              if (newAddress) {
                const addedAddress = address;
                addedAddress!.id = newAddress.id;
                addedAddress!.key = newAddress.key;

                localStorage.setItem(`newAddressId-${index}`, newAddress.id!);
              }
            } else if (action === 'changeAddress') {
              if (addressIdOrKey) {
                const existingAddress = customerData.addresses.find((addr) => addr.id === addressIdOrKey);
                if (existingAddress && existingAddress.id) {
                  localStorage.setItem(`newAddressId-${index}`, existingAddress.id);
                }
              }
            } else if (action === 'removeAddress') {
              localStorage.removeItem(`newAddressId-${index}`);
            }
            return true;
          }
          return false;
        }
        return false;
      } catch (error) {
        CustomerUpdater.handleError(error);
        return false;
      }
    });
  }

  private static handleError(error: unknown): void {
    if (error instanceof Error) {
      showModal('Failed to update customer data', 'Something went wrong...', false);
    }
  }
}
