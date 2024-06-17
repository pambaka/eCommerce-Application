import BaseComponent from '../../../components/base-component';
import ButtonWithSvgIcon from '../../../components/button-with-svg-icon';
import arrows from '../../../assets/arrows-sprite.svg';
import BaseTextComponent from '../../../components/base-text-component';
import Pages from '../../../services/pages';
import { CLASS_NAMES, DOM } from '../../../const';
import showPrevPage from '../logic/show-prev-page';
import handlePrevButtonState from '../logic/handle-prev-button-state';
import showNextPage from '../logic/show-next-page';
import handleNextButtonState from '../logic/handle-next-button-state';

export default function renderPaginationBlock(parentElement: HTMLElement) {
  const wrapper = new BaseComponent('div', 'pagination');

  const prevButton = new ButtonWithSvgIcon(
    CLASS_NAMES.prevButton,
    showPrevPage,
    'Previous page',
    'previous page',
    `${arrows}#left`,
  );
  DOM.add(CLASS_NAMES.prevButton, prevButton.node);
  handlePrevButtonState();

  const pageNumber = new BaseTextComponent('p', CLASS_NAMES.pageNumber, `${Pages.currentPage}`);
  DOM.add(CLASS_NAMES.pageNumber, pageNumber.node);

  const nextButton = new ButtonWithSvgIcon(
    CLASS_NAMES.nextButton,
    showNextPage,
    'Next page',
    'next page',
    `${arrows}#right`,
  );
  DOM.add(CLASS_NAMES.nextButton, nextButton.node);
  handleNextButtonState();

  wrapper.node.append(prevButton.node, pageNumber.node, nextButton.node);

  parentElement.append(wrapper.node);
}
