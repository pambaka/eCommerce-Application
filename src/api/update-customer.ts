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
        showModal('Something went wrong', '');
        return false;
      }

      return true;
    } catch (error) {
      CustomerUpdater.handleError(error);
      return false;
    }
  }

  public async updateCustomerData(field: string, value: string): Promise<boolean> {
    try {
      const action = field === 'email' ? 'changeEmail' : `set${field.charAt(0).toUpperCase() + field.slice(1)}`;
      const customerData = await getUserInfo();
      if (customerData) {
        const requestBody = {
          version: customerData.version,
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

        return success;
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
