import { ApiClientResponse } from '@/types/api'
import { apiClient } from '@/utils/api'

export function logError(subject: string, message: string): ApiClientResponse {
  return apiClient.post('/timeattendance/api/log_error', { subject, message })
}
