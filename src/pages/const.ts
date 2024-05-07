export const FORM_TYPE = {
  login: 'login',
  registration: 'registration',
} as const;

export type FormType = typeof FORM_TYPE.login | typeof FORM_TYPE.registration;
