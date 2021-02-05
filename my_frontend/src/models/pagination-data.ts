import { BaseModel } from '@/models/base'
import { Parsable } from '@/models/parsable'
import { RawData } from '@/types'

export interface RawPaginationData<RawModel> extends RawData {
  results: RawModel[]
  count?: number
  next?: string
  previous?: string
}

export class PaginationData<Model> extends Parsable {
  data: Model[] = []
  total?: number
  next?: string
  previous?: string

  constructor(data?: Partial<PaginationData<Model>>) {
    super()
    if (data) {
      if (data.data) {
        this.data = data.data
      }
      if (data.total) {
        this.total = data.total
      }
      if (data.next) {
        this.next = data.next
      }
      if (data.previous) {
        this.previous = data.previous
      }
    }
  }

  static mapFields = {
    results: 'data',
    count: 'total',
  }

  static parse<RawModel>(
    rawData: RawPaginationData<RawModel>,
  ): PaginationData<RawModel> {
    return new PaginationData<RawModel>(super.parse(rawData))
  }

  static unParse<RawModel>(
    data: PaginationData<RawModel>,
  ): RawPaginationData<RawModel> {
    return super.unParse(data) as RawPaginationData<RawModel>
  }

  static parseWithItems<RawModelType, ModelType extends typeof BaseModel>(
    rawData: RawPaginationData<RawModelType>,
    Model: ModelType,
  ): PaginationData<InstanceType<ModelType>> {
    const rawResult = this.parse(rawData)
    return {
      ...rawResult,
      data: rawResult.data.map((item) => Model.parse(item)) as InstanceType<
        ModelType
      >[],
    }
  }

  static unParseWithItems<
    RawModelType extends Record<string, unknown>,
    ModelType extends typeof BaseModel = typeof BaseModel
  >(
    data: PaginationData<InstanceType<ModelType>>,
    Model: ModelType,
  ): RawPaginationData<RawModelType> {
    const rawResult = this.unParse(data)
    return {
      ...rawResult,
      results: rawResult.results.map((item) =>
        Model.unParse(item),
      ) as RawModelType[],
    }
  }
}
