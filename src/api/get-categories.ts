import { Category } from '../types/products';
import { region } from './const';
import withSpinner from '../utils/with-spinner';

export default async function getCategories(accessToken: string): Promise<Category[] | undefined> {
  return withSpinner(async () => {
    let categories: Category[] | undefined;

    await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/categories`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          return undefined;
        }

        return res.json();
      })
      .then((data) => {
        if (data) categories = data.results;
      })
      .catch((error) => error);

    return categories;
  });
}
