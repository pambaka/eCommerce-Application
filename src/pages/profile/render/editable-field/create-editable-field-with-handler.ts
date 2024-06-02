import makeFieldEditable from './make-editable-field';
import createEditableField from './create-editable-field';

export default function createEditableFieldWithHandler(
  label: string,
  value: string,
  id: string,
  updateCallback: (newValue: string) => void,
  className: string,
  inputClassName: string,
): HTMLElement {
  return createEditableField(
    label,
    value,
    id,
    (event) => {
      const target = event.currentTarget as HTMLElement;
      makeFieldEditable(target.parentNode as HTMLElement, label, value, id, updateCallback, className, inputClassName);
    },
    className,
    inputClassName,
  );
}
