import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const formattedDate = (date: Date) => dayjs(date).utc().format('MMM D, YYYY')

const shortDateFormatted = (date: Date) => dayjs(date).utc().format('D MMM')

export { formattedDate, shortDateFormatted }
