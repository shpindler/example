import { OfficesURLParams } from '@/api/offices'
import { RawWorkCode, WorkCode } from '@/models/work-code'
import { ServerResponse, UseListAPI } from '@/types/api'
import { apiClient } from '@/utils/api'
import { useMemo } from 'react'
import useSWR from 'swr'

export interface WorkCodesURLParams extends Partial<OfficesURLParams> {
  officeId?: string
}

export function workCodesListURL(params: WorkCodesURLParams): string {
  const _params = new URLSearchParams()
  if (params.deviceEventId) {
    _params.set('instance_id', params.deviceEventId.toString())
  }
  if (params.employeeId) {
    _params.set('employee_id', params.employeeId.toString())
  }
  if (params.eventDate) {
    _params.set(
      'event_date',
      params.eventDate.toLocaleString('ru', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      }),
    ) // TODO: Make sure timezone is respected.
  }
  if (params.officeId) {
    _params.set('office_id', params.officeId.toString())
  }
  return '/timeattendance/api/work_codes?' + new URLSearchParams(_params)
}

export const useWorkCodesList: UseListAPI<WorkCode, WorkCodesURLParams> = (
  params,
) => {
  if (!params) {
    throw new Error('Please, specify query params.')
  }
  const { data, error, isValidating } = useSWR<ServerResponse<RawWorkCode[]>>(
    workCodesListURL(params),
    apiClient.get,
  )

  const _data = useMemo(
    () => data && data.data && data.data.map((item) => WorkCode.parse(item)),
    [JSON.stringify(data)],
  )

  return {
    data: _data,
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
