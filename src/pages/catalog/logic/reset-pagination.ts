import Pages from '../../../services/pages';
import handleNextButtonState from './handle-next-button-state';
import handlePrevButtonState from './handle-prev-button-state';

export default function resetPagination(): void {
  Pages.reset();

  handlePrevButtonState();
  handleNextButtonState();
}
