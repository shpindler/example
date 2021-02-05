import { BaseModel, RawBaseModel } from '@/models/base'

export interface RawWorkCode extends RawBaseModel {
  code: string
  name: string
}

export class WorkCode extends BaseModel {
  name = ''

  constructor(data?: Partial<WorkCode>) {
    super(data)
    if (data) {
      if (data.name) {
        this.name = data.name
      }
    }
  }

  static mapFields = {
    code: 'id',
  }

  static parse(rawData: RawWorkCode): WorkCode {
    return new WorkCode(super.parse(rawData))
  }

  static unParse(data: WorkCode): RawWorkCode {
    return super.unParse(data) as RawWorkCode
  }

  static prepareForServer(data: WorkCode): string {
    return data.id
  }
}
