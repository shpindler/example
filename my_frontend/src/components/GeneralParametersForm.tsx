import {
  generalParametersSettingsURL,
  updateGeneralParameters,
} from '@/api/general-parameters'
import { userURL } from '@/api/user'
import { TimezoneField } from '@/components/Fields/Timezone'
import {
  ViolationDeltaField,
  violationDeltaValidationSchema,
} from '@/components/Fields/ViolationDelta'
import { WorkTimeCutOffField } from '@/components/Fields/WorkTimeCutOff'
import { WorkTimeCutOffNoPlanField } from '@/components/Fields/WorkTimeCutOffNoPlan'
import { SimpleForm } from '@/components/SimpleForm'
import { FormError } from '@/models/errors/form'
import {
  GeneralParameters,
  RawGeneralParameters,
} from '@/models/general-parameters'
import { ServerResponse } from '@/types/api'
import { FormProps } from '@/types/form'
import { FormStatus, onFormSubmit, useAppFormik } from '@/utils/form'
import { messages } from '@/utils/validators'
import cn from 'classnames'
import { FormikProvider } from 'formik'
import React, { useEffect, useMemo, useState } from 'react'
import { mutate } from 'swr'
import * as Yup from 'yup'

import style from './GeneralParametersForm.module.scss'

export type GeneralParametersFormProps = FormProps<typeof GeneralParameters>

export const GeneralParametersForm: React.FC<GeneralParametersFormProps> = ({
  initialValues,
  onSuccess,
  onFinally,
  ...otherProps
}) => {
  const [asyncError, setAsyncError] = useState('')
  const formik = useAppFormik({
    initialValues,
    validationSchema: Yup.object().shape({
      violationDelta: violationDeltaValidationSchema.required(
        messages.required,
      ),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await onFormSubmit({
          service: updateGeneralParameters,
          Model: GeneralParameters,
          values,
          helpers,
          onSuccess: async (data, ...rest) => {
            await mutate(
              generalParametersSettingsURL,
              (data: ServerResponse<RawGeneralParameters>) => {
                data.data = GeneralParameters.unParse(values)
                return data
              },
              false,
            )
            if (onSuccess) {
              await onSuccess(data, ...rest)
            }
          },
          onFinally: async (...args) => {
            if (values.timezone !== initialValues.timezone) {
              await mutate(userURL)
            }
            if (onFinally) {
              await onFinally(...args)
            }
          },
        })
      } catch (error) {
        ;(error as FormError).show(error)
      }
    },
  })

  const hasErrors = useMemo(() => {
    return [FormStatus.UNKNOWN_ERROR, FormStatus.HAS_FIELD_ERRORS].includes(
      formik.status,
    )
  }, [formik.status])

  useEffect(() => {
    if (formik.status === FormStatus.SUCCESS || !hasErrors) {
      formik.setStatus(FormStatus.DEFAULT)
    }
  }, [formik.values])

  return (
    <FormikProvider value={formik}>
      <SimpleForm
        data-test-id="form"
        status={formik.status}
        asyncError={asyncError}
        resetAsyncError={() => setAsyncError('')}
        {...otherProps}
      >
        <TimezoneField
          className="mb-3"
          inputClassName={cn(
            style.GeneralParametersForm__field,
            style.GeneralParametersForm__field_timezone,
          )}
        />
        <ViolationDeltaField
          className="mb-3"
          inputClassName={cn(
            style.GeneralParametersForm__field,
            style.GeneralParametersForm__field_violationDelta,
          )}
        />
        <WorkTimeCutOffField
          className="mb-3"
          inputClassName={cn(
            style.GeneralParametersForm__field,
            style.GeneralParametersForm__field_workTimeCutOff,
          )}
        />
        <WorkTimeCutOffNoPlanField
          className={cn(
            style.GeneralParametersForm__field,
            style.GeneralParametersForm__field_workTimeCutOffNoPlan,
            'mb-4',
          )}
        />
      </SimpleForm>
    </FormikProvider>
  )
}
