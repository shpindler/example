import {
  DeviceEventActionList,
  DeviceEventActionListProps,
} from '@/components/ListItems/DeviceEvent/ActionList'
import { SaveToClipboardActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/SaveToClipboard'
import { FfrgDeviceEvent } from '@/plugins/user-specific/ffrg/models/device-event'
import React from 'react'

export interface FfrgDeviceEventActionListProps
  extends Omit<DeviceEventActionListProps, 'instance'> {
  instance: FfrgDeviceEvent
}

export const FfrgDeviceEventActionList: React.FC<FfrgDeviceEventActionListProps> = ({
  instance,
  onClose,
  ...otherProps
}) => {
  return (
    <DeviceEventActionList
      instance={instance}
      onClose={onClose}
      {...otherProps}
    >
      <SaveToClipboardActionListItem
        copyText={instance.territorialManagerEmail}
        onCopy={onClose}
      >
        ТУ {instance.territorialManagerEmail}
      </SaveToClipboardActionListItem>
    </DeviceEventActionList>
  )
}
