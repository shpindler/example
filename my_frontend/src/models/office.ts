import { BaseModel, RawBaseModel } from '@/models/base'

export interface RawOffice extends RawBaseModel {
  id: number
  name: string
}

export class Office extends BaseModel {
  name: string

  constructor(data: Office) {
    super(data)
    this.name = data.name
  }

  static mapFields = {}

  static parse(rawData: RawOffice): Office {
    return new Office(super.parse(rawData) as Office)
  }

  static unParse(data: Office): RawOffice {
    return super.unParse(data) as RawOffice
  }
}
