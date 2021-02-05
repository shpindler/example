import { updateDeviceEvent } from '@/api/device-events'
import {
  ActionListItemProps,
  CheckableActionListItem,
  withCheckProps,
} from '@/components/ListItems/DeviceEvent/ActionListItem'
import { withApplyChangesOnClick } from '@/components/ListItems/withApplyChangesOnClick'
import { DeviceEventStatus } from '@/models/device-event'
import React from 'react'

export interface StatusActionListItemProps
  extends withCheckProps,
    ActionListItemProps {
  status: DeviceEventStatus
}

const StatusActionListItem: React.FC<StatusActionListItemProps> = ({
  children,
  ...otherProps
}) => {
  return (
    <CheckableActionListItem {...otherProps}>
      {children}
    </CheckableActionListItem>
  )
}

const _InStatusActionListItem: React.FC<Omit<
  StatusActionListItemProps,
  'status'
>> = (props) => {
  return (
    <StatusActionListItem {...props} status={DeviceEventStatus.IN}>
      Приход
    </StatusActionListItem>
  )
}

export const InStatusActionListItem = withApplyChangesOnClick(
  _InStatusActionListItem,
  updateDeviceEvent,
  { status: DeviceEventStatus.IN },
)

const _OutStatusActionListItem: React.FC<Omit<
  StatusActionListItemProps,
  'status'
>> = (props) => {
  return (
    <StatusActionListItem {...props} status={DeviceEventStatus.OUT}>
      Уход
    </StatusActionListItem>
  )
}

export const OutStatusActionListItem = withApplyChangesOnClick(
  _OutStatusActionListItem,
  updateDeviceEvent,
  { status: DeviceEventStatus.OUT },
)

const _CheckStatusActionListItem: React.FC<Omit<
  StatusActionListItemProps,
  'status'
>> = (props) => {
  return (
    <StatusActionListItem {...props} status={DeviceEventStatus.CHECK}>
      Проверка
    </StatusActionListItem>
  )
}

export const CheckStatusActionListItem = withApplyChangesOnClick(
  _CheckStatusActionListItem,
  updateDeviceEvent,
  { status: DeviceEventStatus.CHECK },
)
