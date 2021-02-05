import { DataViewerContext } from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import {
  PageSizeField,
  usePageSizeQueryParam,
} from '@/components/Fields/PageSize'
import { Grid } from '@/components/Grid'
import { BaseModel } from '@/models/base'
import { StateSetter } from '@/types'
import React, { useContext, useEffect } from 'react'

export interface DataViewerPageSizeContextValue {
  pageSize: number
  setPageSize: StateSetter<number>
}

export const DataViewerPageSizeContext = React.createContext<
  DataViewerPageSizeContextValue
>({} as DataViewerPageSizeContextValue)

export function withPageSize<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(DataViewer: React.ComponentType<Props>): React.FC<Props> {
  return function DataViewerWithPageSize({ controls, ...otherProps }) {
    const defaultValue = 10
    const [pageSize, setPageSize] = usePageSizeQueryParam({ defaultValue })
    const { setFilters } = useContext(DataViewerContext)

    useEffect(() => {
      setFilters((filters) => ({ ...filters, pageSize }))
    }, [pageSize])

    return (
      <DataViewerPageSizeContext.Provider
        value={{
          pageSize,
          setPageSize,
        }}
      >
        <DataViewer
          {...(otherProps as Props)}
          controls={
            <>
              <Grid.Col xs={3} className="ml-auto">
                <PageSizeField
                  value={pageSize}
                  onChange={(value) =>
                    setPageSize((value as number) || defaultValue)
                  }
                />
              </Grid.Col>
              {controls}
            </>
          }
        />
      </DataViewerPageSizeContext.Provider>
    )
  }
}
