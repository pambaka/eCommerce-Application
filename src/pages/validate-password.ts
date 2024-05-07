export default function validatePassword(password: string): string {
  let warning: string = '';

  if (password === '') warning = 'password is required';

  return warning;
}
