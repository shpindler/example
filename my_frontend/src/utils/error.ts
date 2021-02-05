import { ApiClientError } from '@/types/api'
import { RawFormErrors } from '@/types/form'
import { ERROR_DETAIL_KEY } from '@/utils/constants'

export function getErrorText(
  error?: ApiClientError,
  fallback = 'Ошибка загрузки',
): string {
  return (
    (error &&
      error.response &&
      error.response.data &&
      error.response.data[ERROR_DETAIL_KEY]) ||
    (error && fallback)
  )
}

export function extractErrorsFromResponseData(data?: {
  errors: RawFormErrors
}): RawFormErrors {
  return data ? data.errors : {}
}
