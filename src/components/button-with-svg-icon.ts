import ButtonComponent from './button-component';
import SvgImage from './svg-image';

export default class ButtonWithSvgIcon extends ButtonComponent {
  constructor(
    buttonClassName: string,
    callback: (event: Event) => void,
    buttonAriaLabel: string,
    buttonTitle: string,
    iconUrl: string,
  ) {
    super(buttonClassName, callback, '', false);
    this.node.ariaLabel = buttonAriaLabel;
    this.node.title = buttonTitle;

    const icon = new SvgImage(iconUrl, '');
    this.node.append(icon.node);
  }
}
