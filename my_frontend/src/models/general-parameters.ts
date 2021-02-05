import { BaseModel, RawBaseModel } from '@/models/base'
import { RawFormErrors } from '@/types/form'

export interface RawGeneralParameters extends RawBaseModel {
  timezone: string
  violationdelta: number
  worktimecutoff: number
  worktimecutoffnoplan: boolean
}

export class GeneralParameters extends BaseModel {
  timezone: string
  violationDelta: number
  workTimeCutOff: number
  workTimeCutOffNoPlan: boolean

  constructor(data: GeneralParameters) {
    super()
    this.timezone = data.timezone
    this.violationDelta = data.violationDelta
    this.workTimeCutOff = data.workTimeCutOff
    this.workTimeCutOffNoPlan = data.workTimeCutOffNoPlan
  }

  static mapFields = {
    timezone: 'timezone',
    violationdelta: 'violationDelta',
    worktimecutoff: 'workTimeCutOff',
    worktimecutoffnoplan: 'worktimecutoffnoplan',
  }

  static parse(rawData: RawGeneralParameters): GeneralParameters {
    return new GeneralParameters(super.parse(rawData) as GeneralParameters)
  }

  static unParse(data: Partial<GeneralParameters>): RawGeneralParameters {
    return super.unParse(data) as RawGeneralParameters
  }

  static parseErrors(
    rawData: RawFormErrors,
  ): Partial<Record<keyof GeneralParameters, string>> {
    return super.parseErrors(rawData)
  }
}
