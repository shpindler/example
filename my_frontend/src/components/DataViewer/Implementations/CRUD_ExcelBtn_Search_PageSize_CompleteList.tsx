import { DataViewerProps } from '@/components/DataViewer'
import { DataViewerDefaultLayoutWithPaddings } from '@/components/DataViewer/layouts/default'
import {
  DataViewerProvider,
  DataViewerProviderProps,
} from '@/components/DataViewer/Provider'
import {
  withCreateOperation,
  withCreateOperationProps,
} from '@/components/DataViewer/withCreateOperation'
import { withCRUDOperations } from '@/components/DataViewer/withCRUDOperations'
import {
  withDeleteOperation,
  withDeleteOperationProps,
} from '@/components/DataViewer/withDeleteOperation'
import { withExcelBtn } from '@/components/DataViewer/withExcelBtn'
import { withList } from '@/components/DataViewer/withList'
import { withPageSize } from '@/components/DataViewer/withPageSize'
import { withPagination } from '@/components/DataViewer/withPagination'
import { withSearch } from '@/components/DataViewer/withSearch'
import {
  withUpdateOperation,
  withUpdateOperationProps,
} from '@/components/DataViewer/withUpdateOperation'
import { getPageSizeParser } from '@/components/Fields/PageSize'
import { getSearchParser } from '@/components/Fields/Search'
import { CompleteListWithPagination } from '@/components/Lists/withPagination'
import { getPageParser } from '@/components/Pagination'
import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import React from 'react'

export interface DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList_Filters
  extends Record<string, unknown> {
  search?: string
  page: number
  pageSize: number
}

export interface DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList_Props<
  ModelType extends typeof BaseModel
> extends DataViewerProps<ModelType>,
    withCreateOperationProps<ModelType>,
    withDeleteOperationProps<ModelType>,
    withUpdateOperationProps<ModelType>,
    Pick<
      DataViewerProviderProps<
        InstanceType<ModelType>,
        DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList_Filters
      >,
      'getList'
    > {}

const _DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList = withPagination(
  withPageSize(
    withSearch(
      withExcelBtn(
        withCRUDOperations(
          withDeleteOperation(
            withUpdateOperation(
              withCreateOperation(
                withList(
                  DataViewerDefaultLayoutWithPaddings,
                  CompleteListWithPagination,
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  ),
)

export function DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList<
  ModelType extends typeof BaseModel
>({
  getList,
  ...otherProps
}: DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList_Props<
  ModelType
>): JSX.Element {
  const DataViewer = (_DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList as unknown) as React.ComponentType<
    DataViewerProps<ModelType>
  >
  const getParams = new URLSearchParams(location.search)
  return (
    <DataViewerProvider<
      ModelType,
      DataViewer_with_CRUD_ExcelBtn_Search_PageSize_CompleteList_Filters
    >
      getList={getList}
      initialFilters={{
        page: getPageParser().parse(getParams.get('page') || ''),
        pageSize: getPageSizeParser().parse(getParams.get('page') || ''),
        search: getSearchParser().parse(getParams.get('search') || ''),
      }}
      initialData={new PaginationData<InstanceType<ModelType>>()}
    >
      <DataViewer {...otherProps} />
    </DataViewerProvider>
  )
}
