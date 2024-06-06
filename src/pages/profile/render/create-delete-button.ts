import ButtonComponent from '../../../components/button-component';

export default function createDeleteButton(onDelete: () => void): ButtonComponent {
  const deleteButton = new ButtonComponent('button', onDelete, 'Delete', false);
  deleteButton.node.classList.add('delete_address__btn');
  return deleteButton;
}
