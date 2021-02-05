import { ArrowToLeftIcon } from '@/components/Icons/ArrowToLeft'
import { StopArrowToLeftIcon } from '@/components/Icons/StopArrowToLeft'
import { NumberParser } from '@/models/parser'
import { useQueryParam, useQueryParamResult } from '@/utils/query-params'
import cn from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'

import style from './Pagination.module.scss'

export interface PaginationItemProps {
  active?: boolean
  number?: number
  disabled?: boolean
}

export const PaginationItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = ({
  children,
  className,
  active = false,
  disabled = false,
  ...otherProps
}) => {
  return (
    <article
      data-test-id="pagination-item"
      className={cn(
        style.PaginationItem,
        {
          [style.PaginationItem_active]: active,
          [style.PaginationItem_disabled]: disabled,
        },
        className,
      )}
      {...otherProps}
    >
      {children}
    </article>
  )
}

export const PreviousPaginationItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = (props) => {
  const { t } = useTranslation()
  return (
    <PaginationItem
      className={cn(
        style.PaginationItem_control,
        style.PaginationItem_control_previous,
      )}
      title={t('Предыдущая страница')}
      {...props}
    >
      <ArrowToLeftIcon />
    </PaginationItem>
  )
}

export const NextPaginationItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = (props) => {
  const { t } = useTranslation()
  return (
    <PaginationItem
      className={cn(
        style.PaginationItem_control,
        style.PaginationItem_control_next,
      )}
      title={t('Следующая страница')}
      {...props}
    >
      <ArrowToLeftIcon className={style.PaginationItem__icon} />
    </PaginationItem>
  )
}

export const FirstPaginationItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = (props) => {
  const { t } = useTranslation()
  return (
    <PaginationItem
      className={cn(
        style.PaginationItem_control,
        style.PaginationItem_control_first,
      )}
      title={t('Первая страница')}
      {...props}
    >
      <StopArrowToLeftIcon />
    </PaginationItem>
  )
}

export const LastPaginationItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = (props) => {
  const { t } = useTranslation()
  return (
    <PaginationItem
      className={cn(
        style.PaginationItem_control,
        style.PaginationItem_control_last,
      )}
      title={t('Последняя страница')}
      {...props}
    >
      <StopArrowToLeftIcon className={style.PaginationItem__icon} />
    </PaginationItem>
  )
}

export const PaginationEllipsisItem: React.FC<
  PaginationItemProps & React.ComponentProps<'article'>
> = (props) => {
  return (
    <PaginationItem
      className={style.PaginationItem_ellipsis}
      disabled
      {...props}
    >
      ...
    </PaginationItem>
  )
}

export interface PaginationProps {
  amountOfPages?: number
  page?: number
  leftItemsAmount?: number
  rightItemsAmount?: number
  onPageChange?: (newPage: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  amountOfPages = 1,
  page = 1,
  leftItemsAmount = 2,
  rightItemsAmount = 2,
  onPageChange,
}) => {
  function _onPageChange(newPage: number) {
    if (onPageChange) {
      onPageChange(newPage)
    }
  }
  // If left side has less items then move them to right.
  const _rightItemsAmount =
    page <= leftItemsAmount
      ? rightItemsAmount + leftItemsAmount - page + 1
      : rightItemsAmount
  // Analogically for right side.
  const _leftItemsAmount =
    amountOfPages - page <= rightItemsAmount
      ? leftItemsAmount + rightItemsAmount - (amountOfPages - page)
      : leftItemsAmount

  const items = []
  items.push(
    <FirstPaginationItem
      key="first-page"
      disabled={page === 1}
      onMouseDown={() => _onPageChange(1)}
    />,
  )
  items.push(
    <PreviousPaginationItem
      key="previous-page"
      disabled={page === 1}
      onMouseDown={() => _onPageChange(page - 1)}
    />,
  )
  if (page > _leftItemsAmount + 1) {
    items.push(<PaginationEllipsisItem key="left-ellipsis" />)
  } else {
    const _page = page - _leftItemsAmount
    if (_page > 0) {
      items.push(
        <PaginationItem key={_page} onMouseDown={() => _onPageChange(_page)}>
          {_page}
        </PaginationItem>,
      )
    }
  }
  for (
    let i = page - _leftItemsAmount + 1;
    i <= page + _rightItemsAmount - 1;
    ++i
  ) {
    if (i >= 1 && i <= amountOfPages) {
      items.push(
        <PaginationItem
          key={i}
          active={i === page}
          onMouseDown={() => _onPageChange(i)}
        >
          {i}
        </PaginationItem>,
      )
    }
  }
  if (page < amountOfPages - _rightItemsAmount) {
    items.push(<PaginationEllipsisItem key="right-ellipsis" />)
  } else {
    const _page = page + _rightItemsAmount
    if (_page <= amountOfPages) {
      items.push(
        <PaginationItem key={_page} onMouseDown={() => _onPageChange(_page)}>
          {_page}
        </PaginationItem>,
      )
    }
  }
  items.push(
    <NextPaginationItem
      key="next-page"
      disabled={page >= amountOfPages}
      onMouseDown={() => _onPageChange(page + 1)}
    />,
  )
  items.push(
    <LastPaginationItem
      key="last-page"
      disabled={page >= amountOfPages}
      onMouseDown={() => _onPageChange(amountOfPages)}
    />,
  )
  return <article className={style.Pagination}>{items}</article>
}

export const getPageParser = (): NumberParser => new NumberParser(1)

export function usePageQueryParam(): useQueryParamResult<number> {
  return useQueryParam({
    param: 'page',
    parser: getPageParser(),
    clearParamFromURLIf: (value) => value < 2,
  })
}
