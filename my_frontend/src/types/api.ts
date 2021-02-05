import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import { Permissions as PermissionsModel } from '@/models/permissions'
import { AxiosError, AxiosResponse } from 'axios'

export interface EmptyData {}

export interface ServerResponse<T> {
  data?: T
  error?: string
}

export type ApiClientError = AxiosError

export interface ApiHookResult<T> {
  data?: T
  isLoading: boolean
  isValidating: boolean
  error?: ApiClientError
}

export type ApiClientResponse<T = EmptyData> = Promise<AxiosResponse<T>>

export interface StatusInResponseData {
  status: 'fail' | 'ok'
}

export type CreateAPI<Model extends BaseModel> = (
  data: Partial<Model>,
) => ApiClientResponse<Model>

export type DestroyAPI<Model extends BaseModel> = (
  id: Pick<Model, 'id'>,
) => ApiClientResponse<Model>

export type UpdateAPI<Model extends BaseModel> = (
  data: Partial<Model> & Required<Pick<Model, 'id'>>,
) => ApiClientResponse<Model>

export type GetPaginatedListAPI<Model extends BaseModel, Filters> = (
  filters: Filters,
) => ApiClientResponse<PaginationData<Model>>

export type UsePaginatedListAPI<Model extends BaseModel, Filters> = (
  filters: Filters,
) => ApiHookResult<PaginationData<Model>>

export type UseListAPI<Model extends BaseModel, Filters> = (
  filters?: Filters,
) => ApiHookResult<Model[]>

export type UseItemAPI<Model extends BaseModel> = (
  id?: Pick<Model, 'id'>,
) => ApiHookResult<Model>

export type UsePermissionsAPI<
  Permissions extends PermissionsModel = PermissionsModel
> = () => ApiHookResult<Permissions>
