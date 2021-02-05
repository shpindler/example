import { BaseModel } from '@/models/base'
import { PaginationData, RawPaginationData } from '@/models/pagination-data'
import { ServerResponse } from '@/types/api'

export function preparePage(amountOfPages: number, page: number): number {
  if (page < 1) {
    return 1
  } else if (page > amountOfPages) {
    return amountOfPages
  }
  return page
}

export function getAmountOfPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize) || 1
}

export function parsePaginatedData<
  RawModel,
  ModelType extends typeof BaseModel
>(
  Model: ModelType,
  data?: ServerResponse<RawPaginationData<RawModel>>,
): PaginationData<InstanceType<ModelType>> {
  if (data && data.data) {
    return PaginationData.parseWithItems<RawModel, ModelType>(data.data, Model)
  }
  return new PaginationData()
}
