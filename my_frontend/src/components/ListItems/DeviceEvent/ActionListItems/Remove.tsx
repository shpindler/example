import { DataItemProps } from '@/components/DataViewer'
import {
  ActionListItem,
  ActionListItemProps,
} from '@/components/ListItems/DeviceEvent/ActionListItem'
import { BaseModel } from '@/models/base'
import React from 'react'

export interface RemoveActionListItemProps<Model extends BaseModel>
  extends ActionListItemProps,
    Required<Pick<DataItemProps<Model>, 'onDelete'>> {
  instance: Model
}

export function RemoveActionListItem<Model extends BaseModel>({
  instance,
  onDelete,
  onClick,
  ...otherProps
}: RemoveActionListItemProps<Model>): JSX.Element {
  return (
    <ActionListItem
      {...otherProps}
      onClick={(e) => {
        if (onClick) {
          onClick(e)
        }
        onDelete(e, instance)
      }}
    >
      Удалить отметку
    </ActionListItem>
  )
}
