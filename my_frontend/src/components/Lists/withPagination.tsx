import {
  CompleteList,
  CompleteListProps,
} from '@/components/Lists/CompleteList'
import style from '@/components/Lists/CompleteList.module.scss'
import { Pagination, PaginationProps } from '@/components/Pagination'
import {
  RecordsCounter,
  RecordsCounterProps,
} from '@/components/RecordsCounter'
import {
  UnknownTotalPagination,
  UnknownTotalPaginationProps,
} from '@/components/UnknownTotalPagination'
import { BaseModel } from '@/models/base'
import { getAmountOfPages, preparePage } from '@/utils/pagination'
import cn from 'classnames'
import React, { useEffect } from 'react'

export interface withPaginationProps
  extends Pick<PaginationProps, 'onPageChange' | 'page'> {
  pageSize?: number
  paginator?: PaginationProps
  counter?: RecordsCounterProps
}

function withCompleteListWithUnknownTotalPagination<Model extends BaseModel>(
  CompleteList: React.ComponentType<CompleteListProps<Model>>,
): React.FC<CompleteListProps<Model> & UnknownTotalPaginationProps> {
  return function CompleteListWithUnknownTotalPagination({
    error,
    hasNextPage,
    page,
    onPageChange,
    disabled,
    ...otherProps
  }: CompleteListProps<Model> & UnknownTotalPaginationProps): JSX.Element {
    return (
      <CompleteList error={error} disabled={disabled} {...otherProps}>
        {!error && (
          <footer className={cn(style.CompleteList__footer, 'p-2')}>
            <UnknownTotalPagination
              className="ml-auto"
              page={page}
              hasNextPage={hasNextPage}
              disabled={disabled}
              onPageChange={onPageChange}
            />
          </footer>
        )}
      </CompleteList>
    )
  }
}

function withCompleteListWithKnownTotalPagination<Model extends BaseModel>(
  CompleteList: React.ComponentType<CompleteListProps<Model>>,
): React.FC<CompleteListProps<Model> & withPaginationProps> {
  return function CompleteListWithKnownPagination({
    total,
    filteredTotal,
    pageSize = 10,
    page = 1,
    onPageChange,
    isLoading,
    items = [],
    renderItem,
    error,
    counter,
    paginator,
    ...otherProps
  }: CompleteListProps<Model> & withPaginationProps): JSX.Element {
    const actualTotal =
      (filteredTotal === undefined ? total : filteredTotal) || 0
    const amountOfPages = getAmountOfPages(actualTotal, pageSize)
    const start = pageSize * (page - 1)
    const end = (() => {
      const pageLimit = pageSize * page
      const totalLimit = actualTotal
      if (pageLimit > totalLimit) {
        return totalLimit
      }
      return pageLimit
    })()

    function _onPageChange(newValue: number) {
      if (onPageChange) {
        onPageChange(preparePage(amountOfPages, newValue))
      }
    }

    useEffect(() => {
      if (!isLoading) {
        _onPageChange(page)
      }
    }, [total, filteredTotal, pageSize, isLoading, items.length])

    return (
      <CompleteList
        isLoading={isLoading}
        error={error}
        items={end - start <= pageSize ? items : items.slice(start, end)}
        renderItem={renderItem}
        {...otherProps}
      >
        {!error && (
          <footer className={cn(style.CompleteList__footer, 'p-2')}>
            <RecordsCounter
              start={end === 0 ? 0 : start + 1}
              end={end}
              total={total}
              filteredTotal={
                filteredTotal === total ? undefined : filteredTotal
              }
              {...counter}
            />
            <Pagination
              amountOfPages={amountOfPages}
              page={page}
              onPageChange={_onPageChange}
              {...paginator}
            />
          </footer>
        )}
      </CompleteList>
    )
  }
}

export function withPagination<Model extends BaseModel>(
  CompleteList: React.ComponentType<CompleteListProps<Model>>,
): React.FC<
  CompleteListProps<Model> & withPaginationProps & UnknownTotalPaginationProps
> {
  return function CompleteListWithPagination({
    total,
    items = [],
    pageSize,
    filteredTotal,
    ...otherProps
  }) {
    if (total === undefined) {
      const CompleteListWithUnknownTotalPagination = withCompleteListWithUnknownTotalPagination(
        CompleteList,
      )

      return (
        <CompleteListWithUnknownTotalPagination
          {...(otherProps as CompleteListProps<Model> &
            UnknownTotalPaginationProps)}
          hasNextPage={items.length === pageSize}
          items={items}
        />
      )
    } else {
      const CompleteListWithKnownTotalPagination = withCompleteListWithKnownTotalPagination(
        CompleteList,
      )
      return (
        <CompleteListWithKnownTotalPagination
          total={total}
          items={items}
          pageSize={pageSize}
          filteredTotal={filteredTotal}
          {...otherProps}
        />
      )
    }
  }
}

export const CompleteListWithPagination = withPagination(CompleteList)
