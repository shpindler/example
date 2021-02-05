import { destroyDeviceEvent } from '@/api/device-events'
import {
  RemoveConfirmation,
  RemoveConfirmationProps,
} from '@/components/RemoveConfirmation'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { camelCase, capitalize } from 'lodash'
import React from 'react'

let DeviceEvent: typeof DeviceEventType

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEvent = require(`@/plugins/user-specific/${window.userKey}/models/device-event`)[
    `${capitalize(camelCase(window.userKey))}DeviceEvent`
  ]
} catch {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEvent = require('@/models/device-event').DeviceEvent
}

export interface RemoveDeviceEventConfirmationProps
  extends Omit<
    RemoveConfirmationProps<typeof DeviceEventType>,
    'service' | 'Model'
  > {}

export const RemoveDeviceEventConfirmation: React.FC<RemoveDeviceEventConfirmationProps> = ({
  title = 'Удалить отметку?',
  ...otherProps
}) => {
  return (
    <RemoveConfirmation
      data-test-id="device-event-delete-form"
      title={title}
      service={destroyDeviceEvent}
      Model={DeviceEvent}
      {...otherProps}
    />
  )
}
