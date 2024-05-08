import { minLength, reDigit, reLettersDigits, reLowerLetter, reUpperLetter } from './const';

const message: { [key: string]: string } = {
  upperCaseLetter: 'one uppercase letter (A-Z)',
  lowerCaseLetter: 'one lowercase letter (a-z)',
  digit: 'one digit (0-9)',
  base: 'Include at least',
};

export default function validatePassword(password: string): string {
  let warning: string = '';

  const passwordArr: string[] = password.split('');

  if (password === '') {
    warning = 'Password is required.';
  } else if (!passwordArr.every((char) => char.match(reLettersDigits))) {
    warning = 'Only english letters and digits are allowed.';
  } else {
    if (password.length < minLength.password) warning = `Minimum password length is ${minLength.password} symbols.`;

    const warningMessages: string[] = [];

    if (!passwordArr.some((char) => char.match(reUpperLetter))) {
      warningMessages.push(message.upperCaseLetter);
    }
    if (!passwordArr.some((char) => char.match(reLowerLetter))) {
      warningMessages.push(message.lowerCaseLetter);
    }
    if (!passwordArr.some((char) => char.match(reDigit))) {
      warningMessages.push(message.digit);
    }
    if (warningMessages.length !== 0) {
      warning += ` ${message.base} ${warningMessages.join(', ')}.`;
    }
  }

  return warning;
}
