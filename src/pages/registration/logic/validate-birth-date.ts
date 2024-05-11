export default function validateBirthDate(bDate: string): string {
  console.log('bDate: ', bDate);
  let warning: string = '';

  const bDateTimeStamp: number = Date.parse(bDate);
  console.log('bDateTimeStamp: ', bDateTimeStamp);
  const nowTimeStamp: number = Date.now();
  console.log('nowTimeStamp: ', nowTimeStamp);
  const timeStampDifference = nowTimeStamp - bDateTimeStamp;
  console.log('timeStampDifference: ', timeStampDifference);
  const years = timeStampDifference / (1000 * 3600 * 24 * 365);
  console.log('years: ', years);
  if (years <= 13) warning = 'Only 13 y.o. and older are allowed.';
  return warning;
}
