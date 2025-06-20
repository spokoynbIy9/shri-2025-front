export function getDateStringFromDayOfYear(dayOfYear: number): string {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date(2021, 0);

  date.setDate(dayOfYear);

  const day = date.getDate();
  const monthName = months[date.getMonth()];

  return `${day} ${monthName}`;
}
