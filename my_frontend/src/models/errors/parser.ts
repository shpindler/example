export class ParserError extends Error {
  name = 'Parser Error'
  value: string

  constructor({ value }: Pick<ParserError, 'value'>) {
    super(`Unable to parse "${value}".`)
    this.value = value
  }
}
