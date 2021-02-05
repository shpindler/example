import type { DeviceEvent as DeviceEventType } from '@/models/device-event'
import {
  DeviceEventsPermissions,
  RawDeviceEventsPermissions,
} from '@/models/permissions/device-events'
import {
  ApiClientResponse,
  ApiHookResult,
  DestroyAPI,
  GetPaginatedListAPI,
  ServerResponse,
  StatusInResponseData,
  UpdateAPI,
} from '@/types/api'
import { apiClient } from '@/utils/api'
import { parsePaginatedData } from '@/utils/pagination'
import { camelCase, capitalize } from 'lodash'
import useSWR from 'swr'

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

export interface DeviceEventsURLParams extends Record<string, unknown> {
  page?: number
  pageSize?: number
}

export const deviceEventsPermissionsURL =
  '/timeattendance/api/device-events/permissions'

export const deviceEventsURL = ({
  page,
  pageSize,
}: DeviceEventsURLParams): string => {
  const params = new URLSearchParams()
  if (page) {
    params.set('page', page.toString())
  }
  if (pageSize) {
    params.set('page_size', pageSize.toString())
  }
  return '/timeattendance/api/device-events?' + params
}

export const deviceEventsItemURL = (id: string): string =>
  '/timeattendance/api/device-events/' + id

export const destroyDeviceEvent: DestroyAPI<DeviceEventType> = (data) => {
  return apiClient.delete(deviceEventsItemURL(data.id)).then((r) => {
    return {
      ...r,
      data: DeviceEvent.parse(r.data),
    }
  })
}

export const updateDeviceEvent: UpdateAPI<DeviceEventType> = (data) => {
  const { id, ...otherData } = data
  return apiClient
    .patch(deviceEventsItemURL(id), DeviceEvent.prepareForServer(otherData))
    .then((r) => {
      return {
        ...r,
        data: DeviceEvent.parse(r.data),
      }
    })
}

export const getDeviceEvents: GetPaginatedListAPI<
  DeviceEventType,
  DeviceEventsURLParams
> = (filters) => {
  return apiClient.get(deviceEventsURL(filters)).then((r) => {
    return {
      ...r,
      data: parsePaginatedData(DeviceEvent, r),
    }
  })
}

export function useDeviceEventsPermissions(): ApiHookResult<
  DeviceEventsPermissions
> {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawDeviceEventsPermissions>
  >(deviceEventsPermissionsURL, apiClient.get)

  return {
    data: data && data.data && DeviceEventsPermissions.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}

export const deviceEventImageAsEmployeeAvatarURL = (
  id: DeviceEventType['id'],
) => `/timeattendance/api/device-events/${id}/use-image-as-employee-avatar/`

export function deviceEventImageAsEmployeeAvatar({
  id,
}: Pick<DeviceEventType, 'id'>): ApiClientResponse<StatusInResponseData> {
  return apiClient.post(deviceEventImageAsEmployeeAvatarURL(id))
}
