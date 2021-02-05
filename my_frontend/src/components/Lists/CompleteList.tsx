import { List, ListProps } from '@/components/List'
import { RecordsCounterProps } from '@/components/RecordsCounter'
import { withLoading, withLoadingProps } from '@/components/withLoading'
import { BaseModel } from '@/models/base'
import cn from 'classnames'
import React from 'react'

import style from './CompleteList.module.scss'

export interface CompleteListProps<Model extends BaseModel>
  extends ListProps,
    withLoadingProps,
    Pick<RecordsCounterProps, 'total' | 'filteredTotal'> {
  itemsToShow?: JSX.Element[]
  items?: Model[]
  renderItem: (item: Model, idx: number, items: Model[]) => JSX.Element
  header?: JSX.Element
  emptyElement?: JSX.Element | string
}

const ListWithLoading = withLoading<'ol', ListProps>(List)

export function CompleteList<Model extends BaseModel>({
  children,
  itemsToShow,
  items = [],
  renderItem,
  isLoading,
  error,
  header,
  disabled,
  emptyElement = 'Пусто',
  ...otherProps
}: CompleteListProps<Model>): JSX.Element {
  const _itemsToShow = itemsToShow || items.map(renderItem)
  return (
    <article className={style.CompleteList} {...otherProps}>
      {header && (
        <header className={cn(style.CompleteList__header, 'p-2')}>
          {header}
        </header>
      )}
      <section className={style.CompleteList__body}>
        <ListWithLoading
          isLoading={isLoading}
          error={error}
          disabled={disabled}
        >
          {(emptyElement && !_itemsToShow.length && !disabled && (
            <article className={style.CompleteList__placeholder}>
              {emptyElement}
            </article>
          )) ||
            _itemsToShow}
        </ListWithLoading>
      </section>
      {children}
    </article>
  )
}
