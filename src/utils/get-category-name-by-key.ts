export default function getCategoryKeyByName(name: string) {
  let key = name.charAt(0).toLowerCase() + name.slice(1);
  key = key.replace(' ', '-');

  return key;
}
