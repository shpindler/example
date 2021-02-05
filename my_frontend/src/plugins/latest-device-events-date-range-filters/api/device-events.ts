import { DeviceEventsURLParams } from '@/api/device-events'
import { getDateFromParser } from '@/components/Fields/DateFrom'
import { getDateToParser } from '@/components/Fields/DateTo'
import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import { GetPaginatedListAPI } from '@/types/api'
import { apiClient } from '@/utils/api'
import { parsePaginatedData } from '@/utils/pagination'
import { camelCase, capitalize } from 'lodash'

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

export interface DeviceEventsURLParamsWithDateRange
  extends DeviceEventsURLParams {
  dateFrom?: Date
  dateTo?: Date
}

export const DeviceEventsURLWithDateRange = ({
  page,
  pageSize,
  dateFrom,
  dateTo,
}: DeviceEventsURLParamsWithDateRange): string => {
  const params = new URLSearchParams()
  const dateFromParser = getDateFromParser()
  const dateToParser = getDateToParser()
  if (page) {
    params.set('page', page.toString())
  }
  if (pageSize) {
    params.set('page_size', pageSize.toString())
  }
  if (dateFrom) {
    params.set('date_from', dateFromParser.unParse(dateFrom))
  }
  if (dateTo) {
    params.set('date_to', dateToParser.unParse(dateTo))
  }
  return '/timeattendance/api/device-events?' + params
}

export const getDeviceEvents: GetPaginatedListAPI<
  DeviceEventType,
  DeviceEventsURLParamsWithDateRange
> = (filters) => {
  return apiClient.get(DeviceEventsURLWithDateRange(filters)).then((r) => {
    return {
      ...r,
      data: parsePaginatedData(DeviceEvent, r),
    }
  })
}
