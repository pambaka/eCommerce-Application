import makeFieldEditableWithSelect from './make-field-editable-with-select';

export default function handleEditableField(
  event: Event,
  labelText: string,
  value: string,
  id: string,
  options: { label: string; value: string }[],
  saveCallback: (newValue: string) => void,
  wrapperClass: string,
  textClass: string,
) {
  const target = event.currentTarget as HTMLElement;
  makeFieldEditableWithSelect(
    target.parentNode as HTMLElement,
    labelText,
    value,
    id,
    options,
    saveCallback,
    wrapperClass,
    textClass,
  );
}
