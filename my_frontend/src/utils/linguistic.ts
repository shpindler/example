// Получить слово в родительном падеже с учётом склонения.
export function getParentWord(values: [string, string], count: number): string {
  const lastDigit = Number(count.toString()[count.toString().length - 1])
  if (lastDigit === 1 && count !== 11) {
    return values[0]
  }
  return values[1]
}
