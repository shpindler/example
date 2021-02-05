import {
  RawSettingsPermissions,
  SettingsPermissions,
} from '@/models/permissions/settings'
import { ApiHookResult, ServerResponse } from '@/types/api'
import { apiClient } from '@/utils/api'
import useSWR from 'swr'

export const settingsPermissionsURL = '/timeattendance/api/settings/permissions'
export const pendingCountURL = '/timeattendance/api/pending-count'

export function useSettingsPermissions(): ApiHookResult<SettingsPermissions> {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawSettingsPermissions>
  >(settingsPermissionsURL, apiClient.get)

  return {
    data: data && data.data && SettingsPermissions.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}

export function usePendingCount(): ApiHookResult<number> {
  const { data, error, isValidating } = useSWR<
    ServerResponse<{ count: number }>
  >(pendingCountURL, apiClient.get)

  return {
    data: data && data.data && data.data.count,
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
