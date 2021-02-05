export const messages = {
  default: 'Некорректное значение',
  required: 'Обязательное поле',
  min: (l: number): string => 'Не меньше ' + l,
  max: (l: number): string => 'Не больше ' + l,
  number: 'Должно быть числом',
  integer: 'Должно быть целым числом',
  string: 'Должно быть строкой',
}

export const alphaSpacePattern = /^[а-яА-Яa-zA-Z\s]+/
export const phonePattern = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
