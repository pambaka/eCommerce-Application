export default function replaceLocation(hash: string): void {
  const prevHash = window.location.hash;
  const prevLocation = window.location.href;

  if (prevHash) window.location.replace(`${prevLocation.replace(prevHash, hash)}`);
  else window.location.hash = hash;
}
