export default function getCategoryNameByKey(key: string) {
  let name = key.charAt(0).toUpperCase() + key.slice(1);
  name = name.replaceAll('-', ' ');

  return name;
}
