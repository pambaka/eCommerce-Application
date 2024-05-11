export const FORM_TYPE = {
  login: 'login',
  registration: 'registration',
} as const;

export const minLength = {
  password: 8,
};

export const reUpperLetter: RegExp = /[A-Z]/;
export const reLowerLetter: RegExp = /[a-z]/;
export const reDigit: RegExp = /[0-9]/;
export const reLettersDigits: RegExp = /^[a-zA-Z0-9]/;
export const reLettersWhitespaces: RegExp = /^[a-zA-Z\s]{1,}$/;
export const refiveDigits: RegExp = /^[\d]{5}$/;

export const reEmail: RegExp = /^[\w-.]+@([a-zA-Z]{1,}\.)+[a-zA-Z]{2,6}$/;
