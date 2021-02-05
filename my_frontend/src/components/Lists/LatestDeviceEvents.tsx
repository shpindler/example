import { getDeviceEvents } from '@/api/device-events'
import { DataItemProps } from '@/components/DataViewer'
import {
  DataViewer_with_RUD_PageSize_GroupList,
  DataViewer_with_RUD_PageSize_GroupList_Props,
} from '@/components/DataViewer/Implementations/RUD_PageSize_GroupList'
import { withUpdatingListOnSubmit } from '@/components/Forms/DeviceEvent'
import {
  DeviceEventItem,
  DeviceEventProps,
} from '@/components/ListItems/DeviceEvent'
import { withLastModified } from '@/components/ListItems/withLastModified'
import { ListGroupSeparator } from '@/components/Lists/GroupSeparator'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { PaginationData } from '@/models/pagination-data'
import { areDatesEqual } from '@/utils/equality-checks'
import { camelCase, capitalize } from 'lodash'
import React from 'react'
import { useTranslation } from 'react-i18next'

let DeviceEventModel: typeof DeviceEventType

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEventModel = require(`@/plugins/user-specific/${window.userKey}/models/device-event`)[
    `${capitalize(camelCase(window.userKey))}DeviceEvent`
  ]
} catch {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  DeviceEventModel = require('@/models/device-event').DeviceEvent
}

const DeviceEventForm = withUpdatingListOnSubmit(
  React.lazy(() =>
    import('@/components/Forms/DeviceEvent').then((Module) => ({
      default: Module.DeviceEventForm,
    })),
  ),
)
const RemoveDeviceEventConfirmation = React.lazy(() =>
  import('@/components/RemoveConfirmations/DeviceEvent').then((Module) => ({
    default: Module.RemoveDeviceEventConfirmation,
  })),
)

export const LatestDeviceEventsListProps = ({
  t,
}: ReturnType<
  typeof useTranslation
>): DataViewer_with_RUD_PageSize_GroupList_Props<
  typeof DeviceEventType,
  Date
> => ({
  ItemModel: DeviceEventModel,
  DataItem: withLastModified<DeviceEventType, DeviceEventProps>(
    DeviceEventItem,
  ) as React.FC<DataItemProps<DeviceEventType>>,
  DeleteForm: RemoveDeviceEventConfirmation,
  UpdateForm: function UpdateDeviceEventForm(props) {
    return <DeviceEventForm action="update" {...props} />
  },
  ListHeader: <>{t('Последние отметки')}</>,
  getList: getDeviceEvents,
  listProps: {
    groupBy: 'eventDate',
    renderGroupSeparator(group: Date, idx: number): JSX.Element {
      return (
        <ListGroupSeparator
          key={`data-viewer-group-separator-${group.toString()}`}
          borderless={idx === 0}
        >
          {group.toLocaleDateString('ru', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </ListGroupSeparator>
      )
    },
    areGroupsEqual: areDatesEqual,
  },
  initialData: new PaginationData(),
})

export const LatestDeviceEventsList: React.FC = () => {
  return (
    <DataViewer_with_RUD_PageSize_GroupList<typeof DeviceEventType, Date>
      {...LatestDeviceEventsListProps(useTranslation())}
    />
  )
}
