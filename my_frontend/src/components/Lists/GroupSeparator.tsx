import cn from 'classnames'
import React from 'react'

import style from './GroupSeparator.module.scss'

export interface ListGroupSeparatorProps {
  borderless?: boolean
}

export const ListGroupSeparator: React.FC<ListGroupSeparatorProps> = ({
  children,
  borderless = false,
}) => {
  return (
    <div
      className={cn(style.ListGroupSeparator, {
        [style.ListGroupSeparator_borderless]: borderless,
      })}
    >
      {children}
    </div>
  )
}
