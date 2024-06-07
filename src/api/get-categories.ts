import { Category } from '../types/products';
import { region } from './const';

export default async function getCategories(accessToken: string): Promise<Category[] | undefined> {
  let categories: Category[] | undefined;

  await fetch(`https://api.${region}.commercetools.com/${process.env.project_key}/categories`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((res) => {
      //   console.log(res);

      if (res.status !== 200) {
        return undefined;
      }

      return res.json();
    })
    .then((data) => {
      //   console.log(data);

      if (data) categories = data.results;
    })
    .catch((error) => error);

  return categories;
}
