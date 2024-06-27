import showModal from '../pages/show-modal';
import { Successful } from '../types';
import { Promocode } from '../types/cart';
import { region } from './const';

export default async function getPromocodeById(accessToken: string, id: string): Promise<Promocode | undefined> {
  let promocode: Promocode | undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/cart-discounts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      if (res.status !== Successful.ok) {
        showModal('Something went wrong', 'Please keep calm and try reloading the page');
      }

      return res.json();
    })
    .then((data) => {
      promocode = data;
    })
    .catch((error) => error);

  return promocode;
}
