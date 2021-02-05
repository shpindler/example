import {
  GeneralPermissions,
  RawGeneralPermissions,
} from '@/models/permissions/general'
import { ApiHookResult, ServerResponse } from '@/types/api'
import { apiClient } from '@/utils/api'
import useSWR from 'swr'

export const generalPermissionsURL = '/timeattendance/api/general-permissions'

export function useGeneralPermissions(): ApiHookResult<GeneralPermissions> {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawGeneralPermissions>
  >(generalPermissionsURL, apiClient.get)

  return {
    data: data && data.data && GeneralPermissions.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
