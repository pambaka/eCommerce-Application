import Router from '../../../services/router';

export default function updateCategoryHash(this: HTMLElement) {
  window.location.hash = `${Router.pages.catalog}/${this.getAttribute('value')}`;
}
