import { BaseModel } from '@/models/base'

export class BaseProvider<Model extends BaseModel> {
  instance: Model

  constructor(data: BaseProvider<Model>) {
    this.instance = data.instance
  }
}
