import { region } from './const';
import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';
import { AddressAction, FetchUpdateResponse } from '../types/addresses';
import { Address, CustomerIncomeData } from '../types/index';
// import AddressSectionComponent from '../modules/address-module';

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
      console.log('Request Body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const responseBody: FetchUpdateResponse = await response.json();
      console.log('Response Status:', response.status);
      console.log('Response Body:', JSON.stringify(responseBody, null, 2));

      if (!response.ok) {
        return null;
      }

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

  public async updateAddress(action: AddressAction, addressIdOrKey: string, address?: Address): Promise<boolean> {
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
            const savedParentIndex = localStorage.getItem('parentIndex');
            if (savedParentIndex) {
              const newAddress = response.addresses[parseInt(savedParentIndex, 10)];
              if (newAddress) {
                const addedAddress = address;
                addedAddress!.id = newAddress.id;
                addedAddress!.key = newAddress.key;
                console.log('addAddress', addedAddress, addedAddress!.id);
                console.log('Response Body:', JSON.stringify(response, null, 2));

                localStorage.setItem('newAddressId', newAddress.id!);
              }
            }
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
  }

  public async changeAddress(address: Address): Promise<boolean> {
    try {
      const newAddressId = localStorage.getItem('newAddressId');
      if (!newAddressId) {
        throw new Error('New address ID not found in localStorage');
      }

      const customerData = await getUserInfo();
      if (customerData) {
        const requestBody: { version: number; actions: object[] } = {
          version: customerData.version,
          actions: [
            {
              action: 'changeAddress',
              addressId: newAddressId,
              address,
            },
          ],
        };

        const response = await this.fetchUpdate(requestBody);

        if (response) {
          return true;
        }
        return false;
      }
      return false;
    } catch (error) {
      CustomerUpdater.handleError(error);
      return false;
    }
  }

  private static handleError(error: unknown): void {
    if (error instanceof Error) {
      showModal('Failed to update customer data', 'Something went wrong...', false);
    }
  }
}
