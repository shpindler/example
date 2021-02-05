import { BaseModel, RawBaseModel } from '@/models/base'
import { RawFormErrors } from '@/types/form'

export interface RawReport extends RawBaseModel {
  id: number
  name: string
  rtype: number
  creation_date: string
  update_date: string
  start_date: string
  end_date: string
  typelabel: string
  creator: string
  is_support: boolean
  status: number
  attachment: string
}

export class Report extends BaseModel {
  name?: string
  type?: number
  creationDate?: Date
  updateDate?: Date
  startDate?: Date
  endDate?: Date
  label?: string
  creator?: string
  isSupport?: boolean
  status?: number
  attachment?: string

  static mapFields = {
    id: 'id',
    name: 'name',
    rtype: 'type',
    creation_date: 'creationDate',
    update_date: 'updateDate',
    start_date: 'startDate',
    end_date: 'endDate',
    typelabel: 'label',
    creator: 'creator',
    is_support: 'isSupport',
    status: 'status',
    attachment: 'attachment',
  }

  static parse(rawData: RawReport): Report {
    return super.parse(rawData) as Report
  }

  static unParse(data: Report): RawReport {
    return super.unParse(data) as RawReport
  }

  static parseErrors(
    rawData: RawFormErrors<keyof RawReport>,
  ): Partial<Record<keyof Report, string>> {
    return super.parseErrors(rawData)
  }
}
