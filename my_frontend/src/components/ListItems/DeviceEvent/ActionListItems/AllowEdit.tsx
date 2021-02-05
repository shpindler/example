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

export interface AllowEditActionListItemProps
  extends withCheckProps,
    ActionListItemProps {}

const _AllowEditActionListItem: React.FC<AllowEditActionListItemProps> = (
  props,
) => {
  return (
    <CheckableActionListItem {...props}>
      <Text highlighted>Разрешить редактирование (unMF)</Text>
    </CheckableActionListItem>
  )
}

export const AllowEditActionListItem = withApplyChangesOnClick(
  _AllowEditActionListItem,
  updateDeviceEvent,
  { mode: DeviceEventMode.HANDMADE },
)
