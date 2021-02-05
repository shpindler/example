export function prependZero(value: number): string {
  return value.toString().length === 1 ? `0${value}` : value.toString()
}
