import BaseComponent from '../../../components/base-component';
import BaseTextComponent from '../../../components/base-text-component';
import ButtonComponent from '../../../components/button-component';
import validatePassword from '../../validate-password';

export default function showPasswordModal(onSave: (currentPassword: string, newPassword: string) => void): void {
  const backdrop = new BaseComponent('div', 'backdrop');
  const modal = new BaseComponent('div', 'modal-window');
  modal.node.classList.add('change-pass-modal');

  const title = new BaseTextComponent('p', '', 'Change Password');
  const currentPasswordInput = new BaseComponent('input', 'input');
  (currentPasswordInput.node as HTMLInputElement).type = 'password';
  (currentPasswordInput.node as HTMLInputElement).placeholder = ' Current Password';

  const newPasswordInput = new BaseComponent('input', 'input');
  (newPasswordInput.node as HTMLInputElement).type = 'password';
  (newPasswordInput.node as HTMLInputElement).placeholder = ' New Password';

  const warningMessage = new BaseTextComponent('p', 'warning-message', '');
  warningMessage.node.style.display = 'none';

  const saveButton = new ButtonComponent(
    'button',
    () => {
      const currentPassword = (currentPasswordInput.node as HTMLInputElement).value;
      const newPassword = (newPasswordInput.node as HTMLInputElement).value;
      const validationMessage = validatePassword(newPassword);

      if (validationMessage) {
        warningMessage.node.textContent = validationMessage;
        warningMessage.node.style.display = 'block';
        saveButton.node.disabled = true;
      } else {
        onSave(currentPassword, newPassword);
        backdrop.node.remove();
        modal.node.remove();
      }
    },
    'Save',
    false,
  );

  const closeButton = new ButtonComponent(
    'close-button',
    () => {
      backdrop.node.remove();
      modal.node.remove();
    },
    '',
    false,
  );

  newPasswordInput.node.addEventListener('input', () => {
    const newPassword = (newPasswordInput.node as HTMLInputElement).value;
    const validationMessage = validatePassword(newPassword);

    if (validationMessage) {
      warningMessage.node.textContent = validationMessage;
      warningMessage.node.style.display = 'block';
      saveButton.node.disabled = true;
    } else {
      warningMessage.node.style.display = 'none';
      saveButton.node.disabled = false;
    }
  });

  newPasswordInput.node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      saveButton.node.click();
    }
  });

  modal.node.append(
    title.node,
    currentPasswordInput.node,
    newPasswordInput.node,
    warningMessage.node,
    saveButton.node,
    closeButton.node,
  );
  document.body.append(backdrop.node, modal.node);
}
