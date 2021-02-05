import { Office, RawOffice } from '@/models/office'
import { RawPaginationData } from '@/models/pagination-data'
import {
  GetPaginatedListAPI,
  ServerResponse,
  UsePaginatedListAPI,
} from '@/types/api'
import { apiClient } from '@/utils/api'
import { parsePaginatedData } from '@/utils/pagination'
import { useMemo } from 'react'
import useSWR from 'swr'

export interface OfficesURLParams {
  deviceEventId: string
  employeeId: string
  eventDate?: Date
}

export function officesListURL(params: OfficesURLParams): string {
  const _params = new URLSearchParams()
  _params.set('instance_id', params.deviceEventId.toString())
  _params.set('employee_id', params.employeeId.toString())
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
  return '/timeattendance/api/offices?' + new URLSearchParams(_params)
}

export const getOfficesList: GetPaginatedListAPI<Office, OfficesURLParams> = (
  params,
) => {
  if (!params) {
    throw new Error('Please, specify query params.')
  }
  return apiClient.get(officesListURL(params)).then((r) => {
    return {
      ...r,
      data: parsePaginatedData(Office, r),
    }
  })
}

export const useOfficesList: UsePaginatedListAPI<Office, OfficesURLParams> = (
  params,
) => {
  if (!params) {
    throw new Error('Please, specify query params.')
  }
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawPaginationData<RawOffice>>
  >(officesListURL(params), apiClient.get)

  const _data = useMemo(() => parsePaginatedData(Office, data), [
    JSON.stringify(data),
  ])

  return {
    data: _data,
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
