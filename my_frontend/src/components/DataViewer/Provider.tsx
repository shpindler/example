import {
  DataViewerContext,
  DataViewerContextValue,
} from '@/components/DataViewer/Context'
import { useDataViewer } from '@/components/DataViewer/index'
import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import { GetPaginatedListAPI } from '@/types/api'
import React from 'react'

export interface DataViewerProviderProps<Model extends BaseModel, Filters> {
  getList: GetPaginatedListAPI<Model, Filters>
  initialFilters: Filters
  initialData: PaginationData<Model>
}

export function DataViewerProvider<
  ModelType extends typeof BaseModel,
  Filters extends Record<string, unknown>
>({
  children,
  getList,
  initialFilters,
  initialData,
}: React.PropsWithChildren<
  DataViewerProviderProps<InstanceType<ModelType>, Filters>
>): JSX.Element {
  const contextValue = useDataViewer({ getList, initialFilters, initialData })
  const Context = (DataViewerContext as unknown) as React.Context<
    DataViewerContextValue<InstanceType<ModelType>, Filters>
  >

  return <Context.Provider value={contextValue}>{children}</Context.Provider>
}
