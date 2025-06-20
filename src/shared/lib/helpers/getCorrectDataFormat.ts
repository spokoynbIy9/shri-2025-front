export function getCorrectDataFormat(date: Date): string {
  const stringData = date.toISOString();

  const splittedStringData = stringData.split('T');

  const [year, month, day] = splittedStringData[0].split('-');

  return [day, month, year].join('.');
}
