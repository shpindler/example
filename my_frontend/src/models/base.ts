import { ParsableWithErrors } from '@/models/parsable'
import { RawData } from '@/types'

export interface RawBaseModel extends RawData {}

export class BaseModel extends ParsableWithErrors {
  id = ''

  constructor(data?: Partial<BaseModel>) {
    super()
    if (data) {
      if (data.id) {
        this.id = data.id.toString()
      }
    }
  }
}
