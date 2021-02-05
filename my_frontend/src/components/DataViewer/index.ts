import { DataViewerContextValue } from '@/components/DataViewer/Context'
import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import { ApiClientError, GetPaginatedListAPI } from '@/types/api'
import React, { useState } from 'react'

export interface DataItemProps<Model extends BaseModel> {
  item: Model
  onDelete?: (e: React.SyntheticEvent, item: Model) => void
  onUpdate?: (e: React.SyntheticEvent, item: Model) => void
}

export interface DataViewerLayoutProps {
  before?: JSX.Element
  controls?: JSX.Element
  filterControls?: JSX.Element
  list?: JSX.Element
}

export interface DataViewerProps<ModelType extends typeof BaseModel>
  extends DataViewerLayoutProps {
  ItemModel: ModelType
  DataItem: React.ComponentType<
    DataItemProps<InstanceType<ModelType>> & React.ComponentProps<'article'>
  >
  ListHeader?: JSX.Element
}

export interface DataViewerImplementationProps<
  ModelType extends typeof BaseModel
> {
  decorator?: <InputProps extends DataViewerProps<ModelType>, NewProps>(
    DataViewer: React.ComponentType<InputProps>,
  ) => React.ComponentType<InputProps & NewProps>
}

export interface DataViewerHookProps<
  Model extends BaseModel,
  Filters extends Record<string, unknown>
> {
  initialData: PaginationData<Model>
  initialFilters: Filters
  getList: GetPaginatedListAPI<Model, Filters>
}

export function useDataViewer<
  Model extends BaseModel,
  Filters extends Record<string, unknown>
>({
  initialData,
  initialFilters,
  getList,
}: DataViewerHookProps<Model, Filters>): DataViewerContextValue<
  Model,
  Filters
> {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [isDisabled, setIsDisabled] = useState(false)
  const [error, setError] = useState<ApiClientError | undefined>()
  const [filters, setFilters] = useState<Filters>(initialFilters)

  function fetchData(filters: Filters) {
    setError(undefined)
    setIsLoading(true)
    setIsDisabled(true)
    return getList(filters)
      .then((response) => {
        setData(response.data)
        return response
      })
      .catch((error) => {
        setError(error)
        return error
      })
      .finally(() => {
        setIsLoading(false)
        setIsDisabled(false)
      })
  }

  return {
    data,
    setData,
    isLoading,
    setIsLoading,
    isDisabled,
    setIsDisabled,
    error,
    setError,
    fetchData,
    filters,
    setFilters,
  }
}
