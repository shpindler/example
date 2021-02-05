import { RawPaginationData } from '@/models/pagination-data'
import {
  PositionsPermissions,
  RawPositionsPermissions,
} from '@/models/permissions/position'
import { Position, RawPosition } from '@/models/position'
import {
  CreateAPI,
  DestroyAPI,
  GetPaginatedListAPI,
  ServerResponse,
  UpdateAPI,
  UsePaginatedListAPI,
  UsePermissionsAPI,
} from '@/types/api'
import { apiClient } from '@/utils/api'
import { parsePaginatedData } from '@/utils/pagination'
import { useMemo } from 'react'
import useSWR from 'swr'

export interface PositionsURLParams extends Record<string, unknown> {
  page?: number
  pageSize?: number
  search?: string
}

export const positionsListURL = ({
  search,
  page,
  pageSize,
}: PositionsURLParams): string => {
  const params = new URLSearchParams()
  if (search) {
    params.set('search', search)
  }
  if (page) {
    params.set('page', page.toString())
  }
  if (pageSize) {
    params.set('page_size', pageSize.toString())
  }
  return '/timeattendance/api/positions?' + params
}

export const positionsItemURL = (id: string): string =>
  '/timeattendance/api/positions/' + id

export const positionsPermissionsURL =
  '/timeattendance/api/positions/permissions'

export const xlsxPositionsURL =
  '/timeattendance/accounts/profile/positiondictionary/xlsx/'

export const createPosition: CreateAPI<Position> = (data) => {
  return apiClient
    .post(positionsListURL({}), Position.prepareForServer(data))
    .then((r) => {
      return {
        ...r,
        data: Position.parse(r.data),
      }
    })
}

export const destroyPosition: DestroyAPI<Position> = (data) => {
  return apiClient.delete(positionsItemURL(data.id)).then((r) => {
    return {
      ...r,
      data: Position.parse(r.data),
    }
  })
}

export const updatePosition: UpdateAPI<Position> = (data) => {
  const { id, ...otherData } = data
  return apiClient
    .patch(positionsItemURL(id), Position.prepareForServer(otherData))
    .then((r) => {
      return {
        ...r,
        data: Position.parse(r.data),
      }
    })
}

export const getPositionsList: GetPaginatedListAPI<
  Position,
  PositionsURLParams
> = (params) => {
  return apiClient.get(positionsListURL(params)).then((r) => {
    return {
      ...r,
      data: parsePaginatedData(Position, r),
    }
  })
}

export const usePositionsList: UsePaginatedListAPI<
  Position,
  PositionsURLParams
> = (params) => {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawPaginationData<RawPosition>>
  >(positionsListURL(params), apiClient.get)

  const _data = useMemo(() => parsePaginatedData(Position, data), [
    JSON.stringify(data),
  ])

  return {
    data: _data,
    isLoading: !data && !error,
    error,
    isValidating,
  }
}

export const usePositionsPermissions: UsePermissionsAPI<PositionsPermissions> = () => {
  const { data, error, isValidating } = useSWR<
    ServerResponse<RawPositionsPermissions>
  >(positionsPermissionsURL)

  return {
    data: data && data.data && PositionsPermissions.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
