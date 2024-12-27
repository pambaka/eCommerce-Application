import getCarts from './get-carts';

export default async function isActiveCartExist(token: string): Promise<boolean> {
  let isExist: boolean = false;

  const carts = await getCarts(token);
  if (carts.length !== 0) isExist = true;

  return isExist;
}
