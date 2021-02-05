import { CheckIcon } from '@/components/Icons/Check'
import { ListItem, ListItemProps } from '@/components/ListItem'
import cn from 'classnames'
import React from 'react'

import style from './ActionListItem.module.scss'

export interface ActionListItemProps extends ListItemProps {
  groupStart?: boolean
}

export const ActionListItem = React.forwardRef<
  HTMLDivElement,
  ActionListItemProps
>(function ActionListItem_(
  { children, groupStart = false, onClick, ...otherProps },
  ref,
) {
  return (
    <ListItem
      ref={ref}
      className={cn(style.ActionListItem, {
        [style.ActionListItem_groupStart]: groupStart,
      })}
      interactive
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) {
          onClick(e)
        }
      }}
      {...otherProps}
    >
      {children}
    </ListItem>
  )
})

export interface withCheckProps {
  checked: boolean
}

export function withCheck(
  ActionListItem: React.ComponentType<ActionListItemProps>,
): React.FC<ActionListItemProps & withCheckProps> {
  return function ActionListItemWithCheck({
    checked,
    children,
    ...otherProps
  }) {
    return (
      <ActionListItem {...otherProps}>
        {children}
        {checked && <CheckIcon className={style.ActionListItem__check} />}
      </ActionListItem>
    )
  }
}

export const CheckableActionListItem = withCheck(ActionListItem)
