import { updateDeviceEvent } from '@/api/device-events'
import {
  ActionListItemProps,
  CheckableActionListItem,
  withCheckProps,
} from '@/components/ListItems/DeviceEvent/ActionListItem'
import { withApplyChangesOnClick } from '@/components/ListItems/withApplyChangesOnClick'
import React from 'react'

export interface ShouldCountActionListItemProps
  extends withCheckProps,
    ActionListItemProps {}

const _ShouldCountActionListItem: React.FC<ShouldCountActionListItemProps> = (
  props,
) => {
  return (
    <CheckableActionListItem {...props}>
      Учитывать отметку
    </CheckableActionListItem>
  )
}

export const ShouldCountActionListItem = withApplyChangesOnClick(
  _ShouldCountActionListItem,
  updateDeviceEvent,
  { skip: false },
)

const _ShouldNotCountActionListItem: React.FC<ShouldCountActionListItemProps> = (
  props,
) => {
  return (
    <CheckableActionListItem {...props}>
      Не учитывать отметку
    </CheckableActionListItem>
  )
}

export const ShouldNotCountActionListItem = withApplyChangesOnClick(
  _ShouldNotCountActionListItem,
  updateDeviceEvent,
  { skip: true },
)

const _ShouldCountIfNoFaceActionListItem: React.FC<ShouldCountActionListItemProps> = (
  props,
) => {
  return (
    <CheckableActionListItem {...props}>
      Аннулировать (нет лица)
    </CheckableActionListItem>
  )
}

export const ShouldCountIfNoFaceActionListItem = withApplyChangesOnClick(
  _ShouldCountIfNoFaceActionListItem,
  updateDeviceEvent,
  { skip: true },
)
