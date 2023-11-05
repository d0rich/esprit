import dateFormat from 'dateformat'

export function dateToMonthYear(date: Date | string = new Date()) {
  return dateFormat(date, 'mmm yyyy')
}

export function dateToDayMonthYear(date: Date | string = new Date()) {
  return dateFormat(date, 'dd mmm yyyy')
}

export function monthDiff(d1: Date, d2: Date) {
  let months
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

export function formatYearMonthDateDiff(d1: Date, d2: Date) {
  const allMonths = monthDiff(d1, d2) + 1
  const months = allMonths % 12
  const fullYears = (allMonths - months) / 12
  const yearsPart =
    fullYears > 0 ? `${fullYears} year${fullYears > 1 ? 's' : ''}` : ''
  const monthPart = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''
  return (yearsPart + ' ' + monthPart).trim()
}
