import { InfoMessage } from '@/models/info-message'
import { StateSetter } from '@/types'
import { ApiClientError } from '@/types/api'
import { StatusCodes } from '@/utils/api'

export class FormError extends Error {
  name = 'Form Error'
  originalError: ApiClientError
  hasNonFieldErrors = false

  constructor(
    data: Pick<FormError, 'message' | 'originalError' | 'hasNonFieldErrors'>,
  ) {
    super(data.message)
    this.originalError = data.originalError
    this.hasNonFieldErrors = data.hasNonFieldErrors
  }

  isFailedDependency(): boolean {
    if (this.originalError.response === undefined) {
      return false
    }
    return this.originalError.response.status === StatusCodes.FAILED_DEPENDENCY
  }

  hasInfoMessage(): boolean {
    return this.isFailedDependency()
  }

  getInfoMessage(): InfoMessage {
    if (this.originalError.response === undefined) {
      throw new Error("Can't get info message from non-response error.")
    }
    const result = this.originalError.response.data._info
    if (result === undefined) {
      throw new Error(
        'Please, provide info message for this error: ' + this.originalError,
      )
    }
    return result
  }

  show(
    setAsyncError: StateSetter<string>,
    setInfo?: StateSetter<InfoMessage | undefined>,
  ): void {
    console.error(this.originalError)
    if (setInfo && this.hasInfoMessage()) {
      setInfo(this.getInfoMessage())
    } else if (this.hasNonFieldErrors) {
      setAsyncError(this.message)
    }
  }
}
