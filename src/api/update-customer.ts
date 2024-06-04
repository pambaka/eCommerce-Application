import { region } from './const';
import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';
import { AddressAction, FetchUpdateResponse } from '../types/addresses';
import { Address } from '../types/index';

// export default class CustomerUpdater {
//   private accessToken: string | null;

//   constructor() {
//     this.accessToken = useToken.customer.access.get();
//   }

//   public async fetchUpdate(requestBody: object): Promise<boolean> {
//     if (!this.accessToken) {
//       return false;
//     }

//     const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

//     try {
//       console.log('Request Body:', JSON.stringify(requestBody, null, 2));

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${this.accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const responseBody = await response.json();
//       console.log('Response Status:', response.status);
//       console.log('Response Body:', JSON.stringify(responseBody, null, 2));

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         const errorMessage = errorResponse.message || 'Unknown error';
//         showModal('Failed to update customer data!', errorMessage, false);
//         return false;
//       }

//       return true;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   public async updateCustomerData(field: string, value: string): Promise<boolean> {
//     try {
//       const action = field === 'email' ? 'changeEmail' : `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
//       const customerData = await getUserInfo();
//       const requestBody = {
//         version: customerData?.version,
//         actions: [
//           {
//             action,
//             [field]: value,
//           },
//         ],
//       };

//       const success = await this.fetchUpdate(requestBody);

//       if (success) {
//         showModal(`Successfully updated to ${value}!`, '', true);
//       }

//       return success;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   public async updateAddress(action: AddressAction, addressIdOrKey: string, address?: Address): Promise<boolean> {
//     try {
//       const customerData = await getUserInfo();
//       if (customerData) {
//         const requestBody: { version: number; actions: object[] } = {
//           version: customerData.version,
//           actions: [
//             {
//               action,
//               ...(action === 'removeAddress' ? { addressId: addressIdOrKey } : { addressKey: addressIdOrKey }),
//               ...(address ? { address } : {}),
//             },
//           ],
//         };

//         const success = await this.fetchUpdate(requestBody);

//         if (success) {
//           showModal(`Successfully performed action: ${action}!`, '', true);
//         }

//         return success;
//       }
//       return false;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   private static handleError(error: unknown): void {
//     if (error instanceof Error) {
//       showModal('Failed to update customer data!', 'Something went wrong...', false);
//     }
//   }
// }
// export default class CustomerUpdater {
//   private accessToken: string | null;

//   constructor() {
//     this.accessToken = useToken.customer.access.get();
//   }

//   public async fetchUpdate(requestBody: object): Promise<boolean> {
//     if (!this.accessToken) {
//       return false;
//     }

//     const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

//     try {
//       console.log('Request Body:', JSON.stringify(requestBody, null, 2));

//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${this.accessToken}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(requestBody),
//       });

//       const responseBody = await response.json();
//       console.log('Response Status:', response.status);
//       console.log('Response Body:', JSON.stringify(responseBody, null, 2));

//       if (!response.ok) {
//         const errorResponse = await response.json();
//         const errorMessage = errorResponse.message || 'Unknown error';
//         showModal('Failed to update customer data!', errorMessage, false);
//         return false;
//       }

//       return true;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   public async updateCustomerData(field: string, value: string): Promise<boolean> {
//     try {
//       const action = field === 'email' ? 'changeEmail' : `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
//       const customerData = await getUserInfo();
//       const requestBody = {
//         version: customerData?.version,
//         actions: [
//           {
//             action,
//             [field]: value,
//           },
//         ],
//       };

//       const success = await this.fetchUpdate(requestBody);

//       if (success) {
//         showModal(`Successfully updated to ${value}!`, '', true);
//       }

//       return success;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   public async updateAddress(action: AddressAction, addressId: string, address?: Address): Promise<boolean> {
//     try {
//       const customerData = await getUserInfo();
//       if (customerData) {
//         const requestBody: { version: number; actions: object[] } = {
//           version: customerData.version,
//           actions: [
//             {
//               action,
//               addressId,
//               ...(address ? { address } : {}),
//             },
//           ],
//         };

//         const success = await this.fetchUpdate(requestBody);

//         if (success) {
//           showModal(`Successfully performed action: ${action}!`, '', true);
//         }

//         return success;
//       }
//       return false;
//     } catch (error) {
//       CustomerUpdater.handleError(error);
//       return false;
//     }
//   }

//   private static handleError(error: unknown): void {
//     if (error instanceof Error) {
//       showModal('Failed to update customer data!', 'Something went wrong...', false);
//     }
//   }
// }
export default class CustomerUpdater {
  private accessToken: string | null;

  constructor() {
    this.accessToken = useToken.customer.access.get();
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
        const errorMessage = responseBody.message || 'Unknown error';
        showModal('Failed to update customer data!', errorMessage, false);
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
            const newAddress = response.addresses.find(
              (addr: Address) => addr.streetName === address?.streetName && addr.city === address?.city,
            );
            if (newAddress) {
              const addAddress = address;
              if (addAddress) {
                addAddress.id = newAddress.id;
                addAddress.key = newAddress.key;
              }
            }
          }

          showModal(`Successfully performed action: ${action}!`, '', true);
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
      showModal('Failed to update customer data!', 'Something went wrong...', false);
    }
  }
}
