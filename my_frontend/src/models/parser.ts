import { ParserError } from '@/models/errors/parser'
import { prependZero } from '@/utils/date'

export abstract class BaseParser<T> {
  constructor(
    public defaultValue?: T,
    public validate?: (value: T) => boolean,
  ) {
    this.defaultValue = defaultValue
    this.validate = validate
  }

  _validate(data: T): boolean {
    return !this.validate || this.validate(data)
  }

  _parse(rawData: string, data: T): T {
    if (rawData === '' || !this._validate(data)) {
      if (this.defaultValue !== undefined) {
        return this.defaultValue
      }
      throw new ParserError({ value: rawData })
    }
    return data
  }

  abstract parse(rawData: string): T

  abstract unParse(data: T): string
}

export class StringParser extends BaseParser<string> {
  parse(rawData: string): string {
    return this._parse(rawData, rawData)
  }

  unParse(data: string): string {
    return data || ''
  }
}

export class NumberParser extends BaseParser<number> {
  _validate(data: number): boolean {
    return super._validate(data) && !isNaN(data)
  }

  parse(rawData: string): number {
    return this._parse(rawData, Number(rawData))
  }

  unParse(data: number): string {
    return data ? data.toString() : ''
  }
}

export class DateParser extends BaseParser<Date> {
  parse(rawData: string): Date {
    return this._parse(rawData, new Date(rawData))
  }

  unParse(data: Date): string {
    return data
      ? `${data.getFullYear()}-${prependZero(
          data.getMonth() + 1,
        )}-${prependZero(data.getDate())}T${prependZero(
          data.getHours(),
        )}:${prependZero(data.getMinutes())}:${prependZero(data.getSeconds())}`
      : ''
  }
}
