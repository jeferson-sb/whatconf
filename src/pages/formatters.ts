const formattedDate = (date: Date) =>
  new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date)

const shortDateFormatted = (date: Date) =>
  new Intl.DateTimeFormat('en-UK', {
    month: 'short',
    day: '2-digit',
  }).format(date)

export { formattedDate, shortDateFormatted }
