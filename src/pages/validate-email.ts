export default function validateEmail(email: string): string {
  let warning: string = '';

  if (email === '') warning = 'email is required';

  return warning;
}
