import {
  RawReportsPermissions,
  ReportsPermissions,
} from '@/models/permissions/reports'
import { ApiHookResult, ServerResponse } from '@/types/api'
import { apiClient } from '@/utils/api'
import useSWR from 'swr'

export const reportsPermissionsURL = '/timeattendance/api/reports/permissions'

export function useReportsPermissions(): ApiHookResult<ReportsPermissions> {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawReportsPermissions>
  >(reportsPermissionsURL, apiClient.get)

  return {
    data: data && data.data && ReportsPermissions.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
