import { List } from '@/components/List'
import { ListItem } from '@/components/ListItem'
import cn from 'classnames'
import React from 'react'

import style from './KeyValueDict.module.scss'

export interface KeyValueItem {
  key: JSX.Element | string
  value?: JSX.Element | string
}

export interface KeyValueDictProps {
  items: KeyValueItem[]
  spacingLevel?: number
  placeholder?: JSX.Element | string
}

export const KeyValueDict: React.FC<
  KeyValueDictProps & React.ComponentProps<'ul'>
> = ({
  items,
  className,
  spacingLevel = 4,
  placeholder = '-',
  ...otherProps
}) => {
  return (
    <List className={cn(style.KeyValueDict, className)} {...otherProps}>
      {items.map(({ key, value = '' }) => (
        <ListItem
          key={key.toString()}
          className={cn(style.KeyValueDict__item, `mb-${spacingLevel}`)}
        >
          <section className={style.KeyValueDict__key}>{key}</section>
          <section className={style.KeyValueDict__value}>
            {value || placeholder}
          </section>
        </ListItem>
      ))}
    </List>
  )
}
