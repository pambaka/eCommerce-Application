import { region } from './const';
import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';

export default class CustomerUpdater {
  private accessToken: string | null;

  constructor() {
    this.accessToken = useToken.customer.access.get();
  }

  private async fetchUpdate(requestBody: object): Promise<boolean> {
    if (!this.accessToken) {
      return false;
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

      if (!response.ok) {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || 'Unknown error';
        throw new Error(errorMessage);
      }

      return true;
    } catch (error) {
      if (error instanceof Error) {
        showModal('Failed to update customer data!', error.message, false);
      } else {
        showModal('Failed to update customer data: Unknown error', '', false);
      }
      return false;
    }
  }

  public async updateCustomerData(action: string, value: string): Promise<boolean> {
    const customerData = await getUserInfo();
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action,
          [CustomerUpdater.getActionField(action)]: value,
        },
      ],
    };

    const success = await this.fetchUpdate(requestBody);

    if (success) {
      showModal(`Successfully updated to ${value}! `, '', true);
    }

    return success;
  }

  private static getActionField(action: string): string {
    switch (action) {
      case 'changeEmail':
        return 'email';
      case 'setDateOfBirth':
        return 'dateOfBirth';
      case 'setFirstName':
        return 'firstName';
      case 'setLastName':
        return 'lastName';
      default:
        throw new Error(`Unknown action: ${action}`);
    }
  }

  public async updateCustomerFirstName(firstName: string): Promise<boolean> {
    return this.updateCustomerData('setFirstName', firstName);
  }

  public async updateCustomerLastName(lastName: string): Promise<boolean> {
    return this.updateCustomerData('setLastName', lastName);
  }

  public async updateCustomerEmail(email: string): Promise<boolean> {
    return this.updateCustomerData('changeEmail', email);
  }

  public async updateCustomerBirthday(dateOfBirth: string): Promise<boolean> {
    return this.updateCustomerData('setDateOfBirth', dateOfBirth);
  }
}
