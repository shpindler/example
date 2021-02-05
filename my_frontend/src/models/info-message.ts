import { Parsable } from '@/models/parsable'
import { invert } from 'lodash'

export enum RawInfoMessageType {
  WARNING,
  ERROR,
}

export interface RawInfoMessage {
  type: RawInfoMessageType
  title: string
  description: string
}

export enum InfoMessageType {
  WARNING,
  ERROR,
}

export const infoMessageTypeParsing = {
  [RawInfoMessageType.WARNING]: InfoMessageType.WARNING,
  [RawInfoMessageType.ERROR]: InfoMessageType.ERROR,
}

export const rawInfoMessageTypeParsing = (invert(
  infoMessageTypeParsing,
) as unknown) as Record<InfoMessageType, RawInfoMessageType>

export class InfoMessage extends Parsable {
  constructor(
    public type: InfoMessageType,
    public title: string,
    public description: string,
  ) {
    super()
  }

  static parse(rawData: RawInfoMessage): InfoMessage {
    const result = super.parse(rawData) as InfoMessage
    result.type = infoMessageTypeParsing[rawData.type]
    return result
  }

  static unParse(data: InfoMessage): RawInfoMessage {
    const result = super.unParse(data) as RawInfoMessage
    result.type = rawInfoMessageTypeParsing[data.type]
    return result
  }
}
