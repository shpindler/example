import cn from 'classnames'
import React from 'react'

import style from './List.module.scss'

export interface ListProps extends React.ComponentProps<'div'> {
  className?: string
  ordered?: boolean
  disabled?: boolean
}

export const List: React.FC<ListProps> = ({
  children,
  className,
  disabled = false,
  ...otherProps
}) => {
  return (
    <div
      className={cn(style.List, className, {
        [style.List_disabled]: disabled,
      })}
      {...otherProps}
    >
      {children}
    </div>
  )
}
