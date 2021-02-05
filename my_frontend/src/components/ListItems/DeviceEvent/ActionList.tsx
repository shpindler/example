import { DataItemProps } from '@/components/DataViewer'
import { List, ListProps } from '@/components/List'
import { AllowEditActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/AllowEdit'
import { ImageAsEmployeeAvatarListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/ImageAsEmployeeAvatar'
import { IsFixedActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/IsFixed'
import { RemoveActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/Remove'
import { SaveToClipboardActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItems/SaveToClipboard'
import {
  ShouldCountActionListItem,
  ShouldCountIfNoFaceActionListItem,
  ShouldNotCountActionListItem,
} from '@/components/ListItems/DeviceEvent/ActionListItems/ShouldCount'
import {
  CheckStatusActionListItem,
  InStatusActionListItem,
  OutStatusActionListItem,
} from '@/components/ListItems/DeviceEvent/ActionListItems/Status'
import { UserContext } from '@/components/User.context'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { DeviceEventStatus } from '@/models/device-event'
import React, { useContext } from 'react'

export interface DeviceEventActionListProps
  extends ListProps,
    Required<Pick<DataItemProps<DeviceEventType>, 'onDelete'>> {
  instance: DeviceEventType
  onClose: () => void
}

export function DeviceEventActionList({
  children,
  instance,
  onDelete,
  onClose,
  ...otherProps
}: DeviceEventActionListProps): JSX.Element {
  const user = useContext(UserContext)
  return (
    <List {...otherProps}>
      {children}
      {instance.canUseImageAsEmployeeAvatar && (
        <ImageAsEmployeeAvatarListItem modelId={instance.id} />
      )}
      {user.isSupport && (
        <SaveToClipboardActionListItem
          copyText={
            instance.employee.name +
            ' ' +
            instance.eventDate.toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              hour: 'numeric',
              minute: 'numeric',
            })
          }
          onCopy={onClose}
        >
          Копировать ФИО и дату
        </SaveToClipboardActionListItem>
      )}
      {instance.editable && (
        <InStatusActionListItem
          modelId={instance.id}
          checked={instance.status === DeviceEventStatus.IN}
          groupStart
        />
      )}
      {instance.editable && (
        <OutStatusActionListItem
          modelId={instance.id}
          checked={instance.status === DeviceEventStatus.OUT}
        />
      )}
      {instance.editable && (
        <CheckStatusActionListItem
          modelId={instance.id}
          checked={instance.status === DeviceEventStatus.CHECK}
        />
      )}
      {instance.editable && (
        <ShouldCountActionListItem
          modelId={instance.id}
          checked={!instance.skip}
          groupStart
        />
      )}
      {instance.editable && (
        <ShouldNotCountActionListItem
          modelId={instance.id}
          checked={instance.skip}
        />
      )}
      {!instance.skip && instance.canInvalidate && (
        <ShouldCountIfNoFaceActionListItem
          checked={false}
          modelId={instance.id}
        />
      )}
      <IsFixedActionListItem
        modelId={instance.id}
        checked={instance.fixed}
        groupStart
      />
      <AllowEditActionListItem
        modelId={instance.id}
        checked={!instance.fixed}
      />
      {instance.deletable && (
        <RemoveActionListItem
          instance={instance}
          onDelete={onDelete}
          groupStart
        />
      )}
    </List>
  )
}
