import { RawData } from '@/types'
import { RawFormErrors } from '@/types/form'
import { ERROR_DETAIL_KEY, NON_FIELD_ERRORS_KEY } from '@/utils/constants'
import { invert, mapKeys } from 'lodash'

export class Parsable {
  static mapFields: Record<string, string> = {}

  static parse(rawData: RawData): Parsable {
    return mapKeys(rawData, (_, k) => this.mapFields[k] || k)
  }

  static unParse(data: Parsable): RawData {
    return mapKeys(data, (_, k) => invert(this.mapFields)[k] || k)
  }

  static prepareForServer(data: Parsable): RawData {
    return this.unParse(data)
  }
}

export class ParsableWithErrors extends Parsable {
  static parseErrors(errors: RawFormErrors): Partial<Record<string, string>> {
    const _errors = mapKeys(errors, (_, k) => this.mapFields[k] || k)
    let result = {}
    for (const key in _errors) {
      if (
        Object.prototype.hasOwnProperty.call(_errors, key) &&
        key !== NON_FIELD_ERRORS_KEY &&
        key !== ERROR_DETAIL_KEY
      ) {
        result = { ...result, [key]: _errors[key].join('; ') }
      }
    }
    return result
  }
}
