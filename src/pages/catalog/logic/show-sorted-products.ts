export default async function showSortedProducts(this: HTMLElement) {
  const dropdown = document.querySelector('.dropdown-text');

  if (dropdown && this.textContent) dropdown.textContent = this.textContent;
}
