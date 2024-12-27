import BaseComponent from '../../../components/base-component';
import LabelComponent from '../../../components/label-component';

export default function renderPriceInputBlock(label: string, inputId: string, parentElement: HTMLElement): void {
  const price = new BaseComponent('div');

  const title = new LabelComponent(label, inputId);

  const input = new BaseComponent<HTMLInputElement>('input');
  input.node.type = 'number';
  input.node.min = '0';
  input.node.max = '1000';
  input.node.id = inputId;

  price.node.append(title.node, input.node);

  parentElement.append(price.node);
}
