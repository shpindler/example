import { deviceEventImageAsEmployeeAvatar } from '@/api/device-events'
import { ActionListItem } from '@/components/ListItems/DeviceEvent/ActionListItem'
import { Text } from '@/components/Text'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import React from 'react'

export interface ImageAsEmployeeAvatarListItemProps {
  modelId: DeviceEventType['id']
}

export const ImageAsEmployeeAvatarListItem: React.FC<ImageAsEmployeeAvatarListItemProps> = ({
  modelId,
}) => {
  return (
    <ActionListItem
      onClick={() => deviceEventImageAsEmployeeAvatar({ id: modelId })}
    >
      <Text>Использовать фото как аватар</Text>
    </ActionListItem>
  )
}
