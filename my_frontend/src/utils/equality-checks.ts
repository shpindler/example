export function areDatesEqual(date1: Date, date2: Date): boolean {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return false
  }
  if (date1.getMonth() !== date2.getMonth()) {
    return false
  }
  return date1.getDate() === date2.getDate()
}
