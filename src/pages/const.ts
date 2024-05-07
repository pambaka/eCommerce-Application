export const FORM_TYPE = {
  login: 'login',
  registration: 'registration',
} as const;

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;

export const minLength = {
  password: 8,
};

export const reUpperLetter: RegExp = /[A-Z]/g;
export const reLowerLetter: RegExp = /[a-z]/g;
export const reDigit: RegExp = /[0-9]/g;
export const reLettersDigits: RegExp = /^[a-zA-Z0-9]/g;
