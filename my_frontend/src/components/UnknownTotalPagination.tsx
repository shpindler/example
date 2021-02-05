import {
  NextPaginationItem,
  PaginationEllipsisItem,
  PaginationItem,
  PaginationProps,
  PreviousPaginationItem,
} from '@/components/Pagination'
import style from '@/components/Pagination.module.scss'
import cn from 'classnames'
import React from 'react'

export interface UnknownTotalPaginationProps
  extends Pick<PaginationProps, 'page' | 'onPageChange'> {
  hasNextPage: boolean
  className?: string
  disabled?: boolean
}

export const UnknownTotalPagination: React.FC<UnknownTotalPaginationProps> = ({
  className,
  page = 1,
  hasNextPage,
  disabled,
  onPageChange,
}) => {
  function _onPageChange(newPage: number) {
    if (onPageChange) {
      onPageChange(newPage)
    }
  }

  const items: JSX.Element[] = []
  items.push(
    <PreviousPaginationItem
      key="previous-page"
      disabled={page === 1}
      onMouseDown={() => _onPageChange(page - 1)}
    />,
  )
  if (page > 1) {
    if (page > 2) {
      items.push(
        <PaginationItem key={1} onMouseDown={() => _onPageChange(1)}>
          1
        </PaginationItem>,
      )
      if (page > 3) {
        items.push(<PaginationEllipsisItem key="left-ellipsis" />)
      }
    }
    items.push(
      <PaginationItem
        key={page - 1}
        onMouseDown={() => _onPageChange(page - 1)}
      >
        {page - 1}
      </PaginationItem>,
    )
  }
  items.push(
    <PaginationItem key={page} active onMouseDown={() => _onPageChange(page)}>
      {page}
    </PaginationItem>,
  )
  if (hasNextPage) {
    items.push(
      <PaginationItem
        key={page + 1}
        disabled={disabled}
        onMouseDown={() => _onPageChange(page + 1)}
      >
        {page + 1}
      </PaginationItem>,
    )
    items.push(<PaginationEllipsisItem key="right-ellipsis" />)
  }
  items.push(
    <NextPaginationItem
      key="next-page"
      disabled={!hasNextPage || disabled}
      onMouseDown={() => _onPageChange(page + 1)}
    />,
  )
  return <div className={cn(className, style.Pagination)}>{items}</div>
}
