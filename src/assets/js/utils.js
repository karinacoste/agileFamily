import { data } from 'autoprefixer'
import { format, compareAsc, addDays } from 'date-fns'
export function getCurrentWeekNumber() {
  const currentDate = new Date()
  const startDate = new Date(currentDate.getFullYear(), 0, 1)
  let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000))

  let weekNumber = Math.ceil(days / 7)

  // Display the calculated result
  // console.log('Week number of ' + currentDate + ' is :   ' + weekNumber)
  return weekNumber
}

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
