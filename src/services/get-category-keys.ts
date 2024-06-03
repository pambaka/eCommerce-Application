import getCategories from '../api/get-categories';
import { Category } from '../types/products';
import useToken from './use-token';

export default async function getCategoryKeys(): Promise<string[]> {
  const keys: string[] = [];

  const token: string | null = await useToken.anonymous.access.get();

  if (token) {
    const categories: Category[] | undefined = await getCategories(token);

    if (categories) {
      categories.forEach((cat) => {
        if (cat.key) keys.push(cat.key);
      });
    }
  }

  return keys;
}
