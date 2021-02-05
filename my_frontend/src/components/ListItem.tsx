import cn from 'classnames'
import React from 'react'

import style from './ListItem.module.scss'

export interface ListItemProps extends React.ComponentPropsWithoutRef<'div'> {
  interactive?: boolean
}

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  function ListItem_(
    { children, className, interactive = false, ...otherProps },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(style.ListItem, className, {
          [style.ListItem_interactive]: interactive,
        })}
        {...otherProps}
      >
        {children}
      </div>
    )
  },
)
