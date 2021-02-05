import { RawUser, User } from '@/models/user'
import { ServerResponse, UseItemAPI } from '@/types/api'
import { apiClient } from '@/utils/api'
import useSWR from 'swr'

export const userURL = '/timeattendance/api/user'

export const useUser: UseItemAPI<User> = () => {
  const { data, error, isValidating } = useSWR<ServerResponse<RawUser>>(
    userURL,
    apiClient.get,
  )

  return {
    data: data && data.data && User.parse(data.data),
    isLoading: !data && !error,
    error,
    isValidating,
  }
}
