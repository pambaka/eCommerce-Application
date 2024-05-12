import '../styles/modal.scss';
import { ERROR_MESSAGE } from '../api/const';
import showErrorModal from './show-error-modal';

export default function handleErrorMessage(message: string): void {
  let descriptionText: string | undefined;

  switch (message) {
    case ERROR_MESSAGE.notFound:
      descriptionText = 'Please check your e-mail and password and try again.';
      break;
    default:
      break;
  }

  if (descriptionText) {
    showErrorModal(message, descriptionText);
  }
}
