import { BaseModel } from '@/models/base'
import { FormError } from '@/models/errors/form'
import { CreateAPI, DestroyAPI, UpdateAPI } from '@/types/api'
import { ERROR_DETAIL_KEY, NON_FIELD_ERRORS_KEY } from '@/utils/constants'
import { extractErrorsFromResponseData, getErrorText } from '@/utils/error'
import { AxiosResponse } from 'axios'
import { FormikConfig, FormikErrors, FormikHelpers, useFormik } from 'formik'
import { useEffect, useState } from 'react'

export enum FormStatus {
  DEFAULT = '',
  SUBMITTING = 'Сохранение...',
  SUCCESS = 'Изменения сохранены.',
  UNKNOWN_ERROR = 'Неизвестная ошибка. Попробуйте повторить запрос через 30 секунд.',
  HAS_FIELD_ERRORS = 'Изменения не сохранены. Исправьте ошибки выше.',
}

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export function useAppFormik<Model extends BaseModel>(
  formikConfig: FormikConfig<Partial<Model>>,
) {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    ...formikConfig,
  })
  const [oldValues, setOldValues] = useState(formik.values)

  // Clear field error on field value change.
  useEffect(() => {
    if (Object.keys(formik.errors)) {
      const errors = formik.errors
      for (const key in formik.values) {
        if (Object.prototype.hasOwnProperty.call(formik.values, key)) {
          if (formik.values[key] !== oldValues[key]) {
            delete errors[key]
          }
        }
      }
      formik.setErrors(errors)
    }
    setOldValues(formik.values)
  }, [JSON.stringify(formik.values)])

  return formik
}

export interface FormSubmitConfig<ModelType extends typeof BaseModel> {
  service:
    | CreateAPI<InstanceType<ModelType>>
    | DestroyAPI<InstanceType<ModelType>>
    | UpdateAPI<InstanceType<ModelType>>
  Model: ModelType
  values: Partial<InstanceType<ModelType>>
  helpers: FormikHelpers<Partial<InstanceType<ModelType>>>
  onSuccess?: (
    newValues: InstanceType<ModelType>,
    helpers: FormikHelpers<Partial<InstanceType<ModelType>>>,
    oldValues: Partial<InstanceType<ModelType>>,
  ) => void | Promise<void>
  onFinally?: (
    newValues: InstanceType<ModelType>,
    helpers: FormikHelpers<Partial<InstanceType<ModelType>>>,
    oldValues: Partial<InstanceType<ModelType>>,
  ) => void | Promise<void>
}

export async function onFormSubmit<ModelType extends typeof BaseModel>({
  service,
  Model,
  values,
  helpers,
  onSuccess,
  onFinally,
}: FormSubmitConfig<ModelType>): Promise<
  AxiosResponse<InstanceType<ModelType>>
> {
  const { setErrors, setStatus } = helpers
  setStatus(FormStatus.SUBMITTING)
  try {
    const result = await service(values as InstanceType<ModelType>)
    setStatus(FormStatus.SUCCESS)
    if (onSuccess) {
      await onSuccess(result.data, helpers, values)
    }
    return result
  } catch (error) {
    let hasNonFieldErrors = false
    let status: string
    if (error.response && error.response.status === 400) {
      const errors = Model.parseErrors(
        extractErrorsFromResponseData(error.response.data),
      )
      setErrors(errors as FormikErrors<InstanceType<ModelType>>)
      if (
        errors[NON_FIELD_ERRORS_KEY] ||
        error.response.data[ERROR_DETAIL_KEY]
      ) {
        status =
          errors[NON_FIELD_ERRORS_KEY] || error.response.data[ERROR_DETAIL_KEY]
        hasNonFieldErrors = true
      } else {
        status = FormStatus.HAS_FIELD_ERRORS
      }
    } else {
      status = getErrorText(error, FormStatus.UNKNOWN_ERROR)
      hasNonFieldErrors = true
    }
    setStatus(status)
    throw new FormError({
      originalError: error,
      message: status,
      hasNonFieldErrors,
    })
  } finally {
    if (onFinally) {
      await onFinally(values as InstanceType<ModelType>, helpers, values)
    }
  }
}
