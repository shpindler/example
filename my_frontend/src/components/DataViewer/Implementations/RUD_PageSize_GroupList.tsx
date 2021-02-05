import {
  DataViewerImplementationProps,
  DataViewerProps,
} from '@/components/DataViewer'
import { DataViewerDefaultLayout } from '@/components/DataViewer/layouts/default'
import {
  DataViewerProvider,
  DataViewerProviderProps,
} from '@/components/DataViewer/Provider'
import { withCRUDOperations } from '@/components/DataViewer/withCRUDOperations'
import {
  withDeleteOperation,
  withDeleteOperationProps,
} from '@/components/DataViewer/withDeleteOperation'
import { withList, withListProps } from '@/components/DataViewer/withList'
import { withPageSize } from '@/components/DataViewer/withPageSize'
import { withPagination } from '@/components/DataViewer/withPagination'
import {
  withUpdateOperation,
  withUpdateOperationProps,
} from '@/components/DataViewer/withUpdateOperation'
import { getPageSizeParser } from '@/components/Fields/PageSize'
import { CompleteListProps } from '@/components/Lists/CompleteList'
import { withGroupBy, withGroupByProps } from '@/components/Lists/withGroupBy'
import { CompleteListWithPagination } from '@/components/Lists/withPagination'
import { getPageParser } from '@/components/Pagination'
import { BaseModel } from '@/models/base'
import React from 'react'

export interface DataViewer_with_RUD_PageSize_GroupList_Filters
  extends Record<string, unknown> {
  page: number
  pageSize: number
}

export interface DataViewer_with_RUD_PageSize_GroupList_Props<
  ModelType extends typeof BaseModel,
  Group extends InstanceType<ModelType>[keyof InstanceType<ModelType>]
> extends DataViewerProps<ModelType>,
    withListProps<
      InstanceType<ModelType>,
      CompleteListProps<InstanceType<ModelType>> &
        withGroupByProps<InstanceType<ModelType>, Group>
    >,
    withDeleteOperationProps<ModelType>,
    withUpdateOperationProps<ModelType>,
    Pick<
      DataViewerProviderProps<
        InstanceType<ModelType>,
        DataViewer_with_RUD_PageSize_GroupList_Filters
      >,
      'getList' | 'initialData'
    >,
    DataViewerImplementationProps<ModelType> {}

export const RUD_PageSize_GroupList_Base = withPagination(
  withPageSize(
    withCRUDOperations(
      withDeleteOperation(
        withUpdateOperation(
          withList(
            DataViewerDefaultLayout,
            withGroupBy(CompleteListWithPagination),
          ),
        ),
      ),
    ),
  ),
)

export function DataViewer_with_RUD_PageSize_GroupList<
  ModelType extends typeof BaseModel,
  Group extends InstanceType<ModelType>[keyof InstanceType<ModelType>]
>({
  getList,
  initialData,
  decorator,
  ...otherProps
}: DataViewer_with_RUD_PageSize_GroupList_Props<
  ModelType,
  Group
>): JSX.Element {
  const DataViewer = (decorator
    ? decorator(RUD_PageSize_GroupList_Base)
    : RUD_PageSize_GroupList_Base) as React.FC<
    Omit<
      DataViewer_with_RUD_PageSize_GroupList_Props<ModelType, Group>,
      'getList' | 'initialData'
    >
  >
  const getParams = new URLSearchParams(location.search)
  return (
    <DataViewerProvider<
      ModelType,
      DataViewer_with_RUD_PageSize_GroupList_Filters
    >
      getList={getList}
      initialFilters={{
        page: getPageParser().parse(getParams.get('page') || ''),
        pageSize: getPageSizeParser().parse(getParams.get('page_size') || ''),
      }}
      initialData={initialData}
    >
      <DataViewer {...otherProps} />
    </DataViewerProvider>
  )
}
