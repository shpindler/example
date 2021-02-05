import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import { StateSetter } from '@/types'
import { ApiClientError, GetPaginatedListAPI } from '@/types/api'
import React from 'react'

export interface DataViewerContextValue<
  Model extends BaseModel = BaseModel,
  Filters extends Record<string, unknown> = Record<string, unknown>
> {
  data: PaginationData<Model>
  setData: StateSetter<PaginationData<Model>>
  isDisabled: boolean
  setIsDisabled: StateSetter<boolean>
  isLoading: boolean
  setIsLoading: StateSetter<boolean>
  error?: ApiClientError
  setError: StateSetter<ApiClientError | undefined>
  fetchData: GetPaginatedListAPI<Model, Filters>
  filters: Filters
  setFilters: StateSetter<Filters>
}

export const DataViewerContext = React.createContext<DataViewerContextValue>(
  {} as DataViewerContextValue,
)
