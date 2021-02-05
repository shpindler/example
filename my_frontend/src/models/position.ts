import { BaseModel, RawBaseModel } from '@/models/base'
import { RawFormErrors } from '@/types/form'

export interface RawPosition extends RawBaseModel {
  id: number
  name: string
  alternate_name: string
  external_code: string
  rate: number
  groupofpositions: string | null
  groupname: string
  use_in_bid: boolean
}

export class Position extends BaseModel {
  name = ''
  externalCode = ''
  groupOfPositions: string | null = null
  groupName = ''
  alternateName = ''
  useInBid = false
  rate = 0

  constructor(data?: Partial<Position>) {
    super(data)
    if (data) {
      if (data.name) {
        this.name = data.name
      }
      if (data.externalCode) {
        this.externalCode = data.externalCode
      }
      if (data.groupOfPositions) {
        this.groupOfPositions = data.groupOfPositions
      }
      if (data.groupName) {
        this.groupName = data.groupName
      }
      if (data.alternateName) {
        this.alternateName = data.alternateName
      }
      if (data.useInBid) {
        this.useInBid = data.useInBid
      }
      if (data.rate) {
        this.rate = data.rate
      }
    }
  }

  static mapFields = {
    id: 'id',
    name: 'name',
    external_code: 'externalCode',
    groupofpositions: 'groupOfPositions',
    groupname: 'groupName',
    alternate_name: 'alternateName',
    use_in_bid: 'useInBid',
    rate: 'rate',
  }

  static parse(rawData: RawPosition): Position {
    return new Position(super.parse(rawData))
  }

  static unParse(data: Position): RawPosition {
    return super.unParse(data) as RawPosition
  }

  static parseErrors(
    rawData: RawFormErrors<keyof RawPosition>,
  ): Partial<Record<keyof Position, string>> {
    return super.parseErrors(rawData)
  }
}
