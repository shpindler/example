import {
  GeneralParameters,
  RawGeneralParameters,
} from '@/models/general-parameters'
import { ServerResponse, UpdateAPI, UseItemAPI } from '@/types/api'
import { apiClient } from '@/utils/api'
import useSWR from 'swr'

export const generalParametersSettingsURL =
  '/timeattendance/api/settings/general-parameters'

export const useGeneralParameters: UseItemAPI<GeneralParameters> = () => {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawGeneralParameters>
  >(generalParametersSettingsURL)

  return {
    data: data && data.data && GeneralParameters.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}

export const updateGeneralParameters: UpdateAPI<GeneralParameters> = (data) => {
  return apiClient
    .post(
      generalParametersSettingsURL,
      GeneralParameters.prepareForServer(data),
    )
    .then((r) => {
      return {
        ...r,
        data: GeneralParameters.parse(r.data),
      }
    })
}
