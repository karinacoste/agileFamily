import { data } from 'autoprefixer'
import { format, compareAsc, addDays } from 'date-fns'

export function getWeekStart(w, y) {
  let totalDays = 1 + w * 7 // 1st of January + 7 days for each week
  let date = new Date(y, 0, totalDays)
  if (date.getDay() === 0) {
    date = new Date(y, 0, totalDays + 1)
  } else if (date.getDay() > 1) {
    const daysToRemove = date.getDay() - 1
    date = new Date(y, 0, totalDays - daysToRemove)
  }

  return date
  // return monday
}
