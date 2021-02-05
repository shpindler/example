import { updateDeviceEvent } from '@/api/device-events'
import {
  ActionListItemProps,
  CheckableActionListItem,
  withCheckProps,
} from '@/components/ListItems/DeviceEvent/ActionListItem'
import { withApplyChangesOnClick } from '@/components/ListItems/withApplyChangesOnClick'
import { Text } from '@/components/Text'
import { DeviceEventMode } from '@/models/device-event'
import React from 'react'

export interface IsFixedActionListItemProps
  extends withCheckProps,
    ActionListItemProps {}

const _IsFixedActionListItem: React.FC<IsFixedActionListItemProps> = (
  props,
) => {
  return (
    <CheckableActionListItem {...props}>
      <Text highlighted>Фиксировать (MF)</Text>
    </CheckableActionListItem>
  )
}

export const IsFixedActionListItem = withApplyChangesOnClick(
  _IsFixedActionListItem,
  updateDeviceEvent,
  { mode: DeviceEventMode.OTHER },
)
