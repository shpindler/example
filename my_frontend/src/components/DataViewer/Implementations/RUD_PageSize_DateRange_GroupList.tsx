import {
  DataViewer_with_RUD_PageSize_GroupList_Filters,
  DataViewer_with_RUD_PageSize_GroupList_Props,
} from '@/components/DataViewer/Implementations/RUD_PageSize_GroupList'
import { DataViewerDefaultLayout } from '@/components/DataViewer/layouts/default'
import { DataViewerProvider } from '@/components/DataViewer/Provider'
import { withCRUDOperations } from '@/components/DataViewer/withCRUDOperations'
import { DateFromFilter } from '@/components/DataViewer/withDateFrom'
import {
  withDateRange,
  withDateRangeProps,
} from '@/components/DataViewer/withDateRange'
import { DateToFilter } from '@/components/DataViewer/withDateTo'
import { withDeleteOperation } from '@/components/DataViewer/withDeleteOperation'
import { withList } from '@/components/DataViewer/withList'
import { withPageSize } from '@/components/DataViewer/withPageSize'
import { withPagination } from '@/components/DataViewer/withPagination'
import { withUpdateOperation } from '@/components/DataViewer/withUpdateOperation'
import { getDateFromParser } from '@/components/Fields/DateFrom'
import { getDateToParser } from '@/components/Fields/DateTo'
import { getPageSizeParser } from '@/components/Fields/PageSize'
import { withGroupBy } from '@/components/Lists/withGroupBy'
import { CompleteListWithPagination } from '@/components/Lists/withPagination'
import { getPageParser } from '@/components/Pagination'
import { BaseModel } from '@/models/base'
import { PaginationData } from '@/models/pagination-data'
import React from 'react'

export interface DataViewer_with_RUD_PageSize_DateRange_GroupList_Filters
  extends DataViewer_with_RUD_PageSize_GroupList_Filters,
    DateFromFilter,
    DateToFilter {}

export interface DataViewer_with_RUD_PageSize_DateRange_GroupList_Props<
  ModelType extends typeof BaseModel,
  Group extends InstanceType<ModelType>[keyof InstanceType<ModelType>]
> extends DataViewer_with_RUD_PageSize_GroupList_Props<ModelType, Group>,
    withDateRangeProps {}

export const DataViewer_with_RUD_PageSize_DateRange_GroupList_Base = withPagination(
  withPageSize(
    withDateRange(
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
  ),
)

export function DataViewer_with_RUD_PageSize_DateRange_GroupList<
  ModelType extends typeof BaseModel,
  Group extends InstanceType<ModelType>[keyof InstanceType<ModelType>]
>({
  getList,
  ...otherProps
}: DataViewer_with_RUD_PageSize_DateRange_GroupList_Props<
  ModelType,
  Group
>): JSX.Element {
  const DataViewer = DataViewer_with_RUD_PageSize_DateRange_GroupList_Base as React.FC<
    Omit<
      DataViewer_with_RUD_PageSize_DateRange_GroupList_Props<ModelType, Group>,
      'getList'
    >
  >
  const getParams = new URLSearchParams(location.search)
  return (
    <DataViewerProvider<
      ModelType,
      DataViewer_with_RUD_PageSize_DateRange_GroupList_Filters
    >
      getList={getList}
      initialFilters={{
        page: getPageParser().parse(getParams.get('page') || ''),
        pageSize: getPageSizeParser().parse(getParams.get('page_size') || ''),
        dateFrom: getDateFromParser().parse(getParams.get('date_from') || ''),
        dateTo: getDateToParser().parse(getParams.get('date_to') || ''),
      }}
      initialData={new PaginationData()}
    >
      <DataViewer {...otherProps} />
    </DataViewerProvider>
  )
}
