export default function validateStreet(street: string): string {
  console.log('street: ', street);

  let warning: string = '';

  if (street === '') {
    warning = 'Street is required.';
  } else if (street[0] === ' ' || street[street.length - 1] === ' ') {
    warning = 'The first and last characters should not be spaces.';
  }

  console.log('warning: ', warning);
  return warning;
}
