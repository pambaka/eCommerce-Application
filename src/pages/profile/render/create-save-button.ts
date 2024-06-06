import ButtonComponent from '../../../components/button-component';

export default function createSaveButton(onSave: () => void): ButtonComponent {
  const saveButton = new ButtonComponent('button', onSave, 'Save', false);
  saveButton.node.classList.add('save_changes__btn');
  return saveButton;
}
