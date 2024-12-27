import './card-cart-button.scss';
import ButtonComponent from '../../components/button-component';

export default class CardCartButton extends ButtonComponent {
  constructor(className: string, callback: (event: Event) => void, textContent: string, isDisabled: boolean) {
    super(className, callback, textContent, isDisabled);
    this.node.classList.add('card-cart-button');
  }
}
