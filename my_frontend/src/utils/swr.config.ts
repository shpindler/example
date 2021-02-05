import { apiClient } from '@/utils/api'

export const SWRConfigValue = {
  fetcher: apiClient.get,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
}
