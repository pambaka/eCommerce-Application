export default function validateBirthDate(bDate: string): string {
  let warning: string = '';
  if (bDate === '') return 'Complete the field';
  const bDateTimeStamp: number = Date.parse(bDate);
  const nowTimeStamp: number = Date.now();
  const timeStampDifference = nowTimeStamp - bDateTimeStamp;
  const years = timeStampDifference / (1000 * 3600 * 24 * 365);
  if (years <= 13) warning = 'Only 13 y.o. and older are allowed.';
  return warning;
}
