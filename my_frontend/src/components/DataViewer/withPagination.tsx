import {
  DataViewerContext,
  DataViewerContextValue,
} from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import { usePageQueryParam } from '@/components/Pagination'
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import React, { useContext, useEffect, useRef } from 'react'

export interface DataViewerPaginationContextValue {
  page: number
  setPage: StateSetter<number>
}

export const DataViewerPaginationContext = React.createContext<
  DataViewerPaginationContextValue
>({} as DataViewerPaginationContextValue)

export function withPagination<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props> {
  return function DataViewerWithPagination(props) {
    const [page, setPage] = usePageQueryParam()
    const { setFilters } = useContext(DataViewerContext)

    useEffect(() => {
      setFilters((filters) => ({ ...filters, page }))
    }, [page])

    const { fetchData, filters } = (useContext(
      DataViewerContext,
    ) as unknown) as DataViewerContextValue<InstanceType<ModelType>>
    const firstUpdate = useRef(true)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { page: _, ...filtersWithoutPage } = filters

    useEffect(() => {
      if (!firstUpdate.current) {
        setPage(1)
        // It's important since page state won't be updated during the fetch.
        filters.page = 1
        fetchData(filters)
      }
    }, [JSON.stringify(filtersWithoutPage)])

    useEffect(() => {
      filters.page = page
      fetchData(filters)
    }, [page])

    useEffect(() => {
      firstUpdate.current = false
    }, [])

    const contextValue = { page, setPage }

    return (
      <DataViewerPaginationContext.Provider value={contextValue}>
        <DataViewer {...props} />
      </DataViewerPaginationContext.Provider>
    )
  }
}
