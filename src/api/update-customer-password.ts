import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';
import { region } from './const';
import getCustomerTokens from './get-customer-tokens';

export default async function updateCustomerPassword(currentPassword: string, newPassword: string): Promise<void> {
  const accessToken = useToken.customer.access.get();

  if (!accessToken) {
    showModal('No access token available', '', false);
    return;
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/customers/password`;

  try {
    const customerData = await getUserInfo();

    if (!customerData) {
      showModal('Failed to retrieve customer data', '', false);
      return;
    }

    const requestBody = {
      id: customerData.id,
      version: customerData.version,
      currentPassword,
      newPassword,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      const userErrorMessage =
        errorResponse.message === 'The given current password does not match.'
          ? errorResponse.message
          : 'Unknown error';
      showModal('Failed to update password', userErrorMessage, false);
      return;
    }

    const newAccessToken = await getCustomerTokens(customerData.email, newPassword);
    if (newAccessToken) {
      await useToken.customer.access.set(newAccessToken);
      showModal('Password was successfully updated', '', true);
    } else {
      showModal('Failed to update password', '', false);
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        showModal('Failed to update data', 'Network error, please check your internet connection.', false);
      } else {
        const userErrorMessage =
          error.message === 'The given current password does not match.' ? error.message : 'Unknown error';
        showModal('Failed to update customer data!', userErrorMessage, false);
      }
    } else {
      showModal('Failed to update data', 'Something went wrong...', false);
    }
  }
}
