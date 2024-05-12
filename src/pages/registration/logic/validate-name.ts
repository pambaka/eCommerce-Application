import { reLettersWhitespaces } from '../../const';

export default function validateName(name: string, inputName: string): string {
  let warning: string = '';
  let fieldName;
  switch (inputName) {
    case 'first-name':
      fieldName = 'First name';
      break;

    case 'last-name':
      fieldName = 'Last name';
      break;

    default:
      fieldName = 'City';
  }

  const isValid = reLettersWhitespaces.test(name);

  if (name === '') {
    warning = `${fieldName} is required.`;
  } else if (name[0] === ' ' || name[name.length - 1] === ' ') {
    warning = 'The first and last characters should not be spaces.';
  } else if (!isValid) {
    warning = `${fieldName} should consist of English letters and spaces.`;
  }

  return warning;
}
