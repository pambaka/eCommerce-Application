import Router from '../../../services/router';
import resetFilters from './reset-filters';

export default function updateCategoryHash(this: HTMLElement) {
  window.location.hash = `${Router.pages.catalog}/${this.getAttribute('value')}`;

  resetFilters();
}
