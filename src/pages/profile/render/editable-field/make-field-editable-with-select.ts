// import ButtonWithSvgIcon from '../../../../components/button-with-svg-icon';
// import editIcon from '../../../../assets/edit-icons-sprite.svg';
// import createEditableField from './create-editable-field';
// import OptionComponent from '../../../../components/option-component';
// import BaseComponent from '../../../../components/base-component';
// import updateSaveChangesButtonState from './update-save-changes-state';

// export default function makeFieldEditableWithSelect(
//   wrapper: HTMLElement,
//   labelText: string,
//   value: string,
//   id: string,
//   options: { label: string; value: string }[],
//   saveCallback: (newValue: string) => void,
//   wrapperClass: string,
//   textClass: string,
// ) {
//   const select = new BaseComponent<HTMLSelectElement>('select', textClass);
//   select.node.id = id;

//   options.forEach((option) => {
//     const optionElement = new OptionComponent(option.label, option.value);
//     if (option.value === value) {
//       optionElement.node.selected = true;
//     }
//     select.node.appendChild(optionElement.node);
//   });

//   const saveButton = new ButtonWithSvgIcon(
//     'save-button',
//     () => {
//       saveCallback(select.node.value);
//       const newField = createEditableField(
//         labelText,
//         select.node.value,
//         id,
//         (event) => {
//           const target = event.currentTarget as HTMLElement;
//           makeFieldEditableWithSelect(
//             target.parentNode as HTMLElement,
//             labelText,
//             select.node.value,
//             id,
//             options,
//             saveCallback,
//             wrapperClass,
//             textClass,
//           );
//         },
//         wrapperClass,
//         textClass,
//       );
//       wrapper.replaceWith(newField);
//       updateSaveChangesButtonState();
//     },
//     'Save',
//     'Save',
//     `${editIcon}#save`,
//   );

//   wrapper.querySelector('span')?.replaceWith(select.node);
//   wrapper.querySelector('.edit-button')?.replaceWith(saveButton.node);

//   select.node.addEventListener('keydown', (event: KeyboardEvent) => {
//     if (event.key === 'Enter') {
//       saveButton.node.click();
//     }
//   });
//   updateSaveChangesButtonState();
// }
