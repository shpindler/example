import { DataViewer_with_RUD_PageSize_DateRange_GroupList } from '@/components/DataViewer/Implementations/RUD_PageSize_DateRange_GroupList'
import { LatestDeviceEventsListProps } from '@/components/Lists/LatestDeviceEvents'
import { getDeviceEvents } from '@/plugins/latest-device-events-date-range-filters/api/device-events'
import React from 'react'
import { useTranslation } from 'react-i18next'

export interface LatestDeviceEventsProps {}

const today = new Date()
const endOfTheMonth = new Date(
  today.getFullYear(),
  today.getMonth() + 1,
  0,
  23,
  59,
)

export const OmcLatestDeviceEventsList: React.FC<LatestDeviceEventsProps> = () => {
  return (
    <DataViewer_with_RUD_PageSize_DateRange_GroupList
      {...LatestDeviceEventsListProps(useTranslation())}
      getList={getDeviceEvents}
      defaultDateTo={endOfTheMonth}
    />
  )
}
