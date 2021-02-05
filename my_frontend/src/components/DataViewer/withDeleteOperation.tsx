// Must be use together with withCRUDOperations HOC.
import { Alert } from '@/components/Alert'
import {
  DataViewerContext,
  DataViewerContextValue,
} from '@/components/DataViewer/Context'
import { DataViewerProps } from '@/components/DataViewer/index'
import { DataViewerCRUDOperationsContext } from '@/components/DataViewer/withCRUDOperations'
import { DataViewerPageSizeContext } from '@/components/DataViewer/withPageSize'
import { DataViewerPaginationContext } from '@/components/DataViewer/withPagination'
import { DynamicComponentLoading } from '@/components/DynamicComponentLoading'
import { RemoveConfirmationProps } from '@/components/RemoveConfirmation'
import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import { getAmountOfPages } from '@/utils/pagination'
import { useContextWithFallback } from '@/utils/use-context-with-fallback'
import React, { useContext, useMemo } from 'react'

export interface withDeleteOperationProps<ModelType extends typeof BaseModel> {
  DeleteForm: React.ComponentType<
    Omit<RemoveConfirmationProps<ModelType>, 'service' | 'Model'>
  >
}

export interface DataViewerDeleteOperationContextValue<
  Model extends BaseModel
> {
  applyRemoving: (item: Model, data: PaginationData<Model>) => void
}

export const DataViewerDeleteOperationContext = React.createContext<
  DataViewerDeleteOperationContextValue<BaseModel>
>({} as DataViewerDeleteOperationContextValue<BaseModel>)

export function withDeleteOperation<
  ModelType extends typeof BaseModel,
  Props extends DataViewerProps<ModelType>
>(
  DataViewer: React.ComponentType<Props>,
): React.FC<Props & withDeleteOperationProps<ModelType>> {
  return function DataViewerWithDeleteOperation({
    DataItem,
    DeleteForm,
    ...otherProps
  }) {
    const { data, setData, fetchData, filters } = (useContext(
      DataViewerContext,
    ) as unknown) as DataViewerContextValue<InstanceType<ModelType>>
    const {
      selectedItem,
      setSelectedItem,
      formAction,
      setFormAction,
    } = useContext(DataViewerCRUDOperationsContext)
    const { pageSize } = useContextWithFallback(DataViewerPageSizeContext, {
      pageSize: Number.MAX_SAFE_INTEGER,
      setPageSize: () => undefined,
    })
    const { page, setPage } = useContextWithFallback(
      DataViewerPaginationContext,
      {
        page: 1,
        setPage: () => undefined,
      },
    )

    // TODO: Without arguments it doesn't work in withUpdatingListOnSubmit HOC case since selectedItem and data are empty values. Why?
    async function applyRemoving(
      item: InstanceType<ModelType>,
      data: PaginationData<InstanceType<ModelType>>,
    ) {
      if (data.data.length === 1 && page > 1) {
        setPage(page - 1)
      }
      data.data.splice(
        data.data.findIndex(({ id }) => id === item.id),
        1,
      )
      if (
        data.total === undefined ||
        page < getAmountOfPages(data.total, pageSize)
      ) {
        const nextPageFirstItemResponse = await fetchData({
          ...filters,
          page: pageSize * page,
          pageSize: 1,
        })
        if (
          nextPageFirstItemResponse.status === 200 &&
          nextPageFirstItemResponse.data.data.length
        ) {
          data.data.push(nextPageFirstItemResponse.data.data[0])
        }
      }
      if (data.total) {
        data.total--
      }
      setData(data)
    }

    const contextValue = useMemo(
      () => ({
        applyRemoving,
      }),
      [],
    )

    const Context = (DataViewerDeleteOperationContext as unknown) as React.Context<
      DataViewerDeleteOperationContextValue<InstanceType<ModelType>>
    >

    return (
      <Context.Provider value={contextValue}>
        <DataViewer
          {...(otherProps as Props)}
          DataItem={function DataItemWithDeleteOperation({
            onDelete,
            ...otherProps
          }) {
            return (
              <DataItem
                {...otherProps}
                onDelete={(e, item) => {
                  e.stopPropagation()
                  if (onDelete) {
                    onDelete(e, item)
                  }
                  setFormAction('delete')
                  setSelectedItem(item)
                }}
              />
            )
          }}
        />
        {selectedItem && formAction === 'delete' && (
          <Alert onClose={() => setSelectedItem(undefined)}>
            <DynamicComponentLoading>
              <DeleteForm
                initialValues={selectedItem as InstanceType<ModelType>}
                onSuccess={async (item) => {
                  await applyRemoving(item, data)
                  setSelectedItem(undefined)
                }}
                onCancel={() => setSelectedItem(undefined)}
              />
            </DynamicComponentLoading>
          </Alert>
        )}
      </Context.Provider>
    )
  }
}
