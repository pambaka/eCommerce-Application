import { region } from './const';
import useToken from '../services/use-token';
import getUserInfo from './get-user-info';
import showModal from '../pages/show-modal';

export default async function updateCustomerEmail(email: string): Promise<boolean> {
  const accessToken = useToken.customer.access.get();

  if (!accessToken) {
    showModal('No access token available', '', false);
    return false;
  }

  const url = `https://api.${region}.commercetools.com/${process.env.project_key}/me`;

  try {
    const customerData = await getUserInfo();
    const requestBody = {
      version: customerData.version,
      actions: [
        {
          action: 'changeEmail',
          email,
        },
      ],
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
      const errorMessage = errorResponse.message || 'Unknown error';
      throw new Error(errorMessage);
    }

    showModal('Email was successfully updated', '', true);
    return true;
  } catch (error) {
    if (error instanceof Error) {
      showModal(`Failed to update email!`, error.message, false);
      console.error(error.message);
    } else {
      showModal('Failed to update email: Unknown error', '', false);
    }
    return false;
  }
}
