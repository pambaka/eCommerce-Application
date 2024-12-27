import { reFiveDigits } from '../../const';

export default function validatePostalCode(code: string): string {
  let warning: string = '';

  const isValid = reFiveDigits.test(code);

  if (code === '') {
    warning = 'Postal code is required.';
  } else if (!isValid) {
    warning = 'Postal code format is 5 digits.';
  }

  return warning;
}
