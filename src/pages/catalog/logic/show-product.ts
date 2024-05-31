import showModal from '../../show-modal';

export default async function showProduct(this: HTMLElement): Promise<void> {
  const key = this.getAttribute('key');

  if (key && key !== 'undefined') {
    window.location.hash = `#product/${key}`;
  } else {
    showModal('Failed to retrive product information', 'Please contact us');
  }
}
