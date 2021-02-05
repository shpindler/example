import {
  DataViewerContext,
  DataViewerContextValue,
} from '@/components/DataViewer/Context'
import {
  DataViewerLayoutProps,
  DataViewerProps,
} from '@/components/DataViewer/index'
import { DataViewerPageSizeContext } from '@/components/DataViewer/withPageSize'
import {
  DataViewerPaginationContext,
  DataViewerPaginationContextValue,
} from '@/components/DataViewer/withPagination'
import { CompleteListProps } from '@/components/Lists/CompleteList'
import { BaseModel } from '@/models/base'
import { getErrorText } from '@/utils/error'
import { getAmountOfPages } from '@/utils/pagination'
import React, { useContext, useEffect } from 'react'

export interface withListProps<
  Model extends BaseModel,
  ListProps extends CompleteListProps<Model>
> {
  listProps: Partial<ListProps>
}

export interface withListURLParams extends Record<string, unknown> {
  page: number
  pageSize: number
}

export const withList = <
  ModelType extends typeof BaseModel,
  ListProps extends CompleteListProps<InstanceType<ModelType>>,
  Props extends DataViewerProps<ModelType> &
    withListProps<InstanceType<ModelType>, ListProps>
>(
  DataViewerLayout: React.ComponentType<DataViewerLayoutProps>,
  CompleteList: React.ComponentType<ListProps>,
): React.FC<Props> => {
  return function DataViewerLayoutWithList({
    DataItem,
    ListHeader,
    listProps,
    ...otherProps
  }) {
    const { error, setError, data, isDisabled, isLoading } = (useContext(
      DataViewerContext,
    ) as unknown) as DataViewerContextValue<
      InstanceType<ModelType>,
      withListURLParams
    >
    const { page, setPage } = useContext(
      DataViewerPaginationContext,
    ) as DataViewerPaginationContextValue
    const { pageSize } = useContext(DataViewerPageSizeContext)

    useEffect(() => {
      if (error && error.response && error.response.status === 404) {
        if (data.total === undefined) {
          setPage(page - 1 || 1)
        } else {
          setPage(getAmountOfPages(data.total, pageSize) - 1 || 1)
        }
        setError(undefined)
      }
    }, [error])

    return (
      <DataViewerLayout
        {...otherProps}
        list={
          <CompleteList
            {...(listProps as ListProps)}
            header={ListHeader}
            isLoading={(!isDisabled || !data.data.length) && isLoading}
            error={getErrorText(error)}
            items={data.data}
            page={page}
            pageSize={pageSize}
            total={data.total}
            filteredTotal={data.total}
            disabled={isDisabled}
            onPageChange={setPage}
            renderItem={(item) => {
              return (
                <DataItem
                  key={`data-viewer-list-item-${item.id}`}
                  item={item}
                />
              )
            }}
          />
        }
      />
    )
  }
}
