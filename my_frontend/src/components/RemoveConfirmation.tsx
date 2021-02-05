import { SimpleForm } from '@/components/SimpleForm'
import { Title } from '@/components/Title'
import { BaseModel } from '@/models/base'
import { FormError } from '@/models/errors/form'
import { DestroyAPI } from '@/types/api'
import { FormProps } from '@/types/form'
import { onFormSubmit, useAppFormik } from '@/utils/form'
import cn from 'classnames'
import { FormikProvider } from 'formik'
import React, { useState } from 'react'

import style from './RemoveConfirmation.module.scss'

export type RemoveConfirmationProps<
  ModelType extends typeof BaseModel
> = FormProps<ModelType> & {
  title?: string
  service: DestroyAPI<InstanceType<ModelType>>
  Model: ModelType
}

export function RemoveConfirmation<ModelType extends typeof BaseModel>({
  title,
  variant = 'danger',
  submitBtnText = 'Да, удалить',
  service,
  Model,
  onCancel,
  initialValues,
  onSuccess,
  ...otherProps
}: RemoveConfirmationProps<ModelType>): JSX.Element {
  const [asyncError, setAsyncError] = useState('')
  const formik = useAppFormik({
    initialValues,
    onSubmit: async (values, helpers) => {
      try {
        await onFormSubmit({
          service,
          Model,
          values,
          helpers,
          onSuccess,
        })
      } catch (error) {
        ;(error as FormError).show(error)
      }
    },
  })
  return (
    <FormikProvider value={formik}>
      <SimpleForm
        className={style.RemoveConfirmation}
        variant={variant}
        submitBtnText={submitBtnText}
        status={formik.status}
        asyncError={asyncError}
        resetAsyncError={() => setAsyncError('')}
        onCancel={onCancel}
        {...otherProps}
      >
        {title && (
          <Title level={5} className="mb-3">
            {title}
          </Title>
        )}
        <section className={cn(style.RemoveConfirmation__text, 'mb-3')}>
          Это действие необратимо.
        </section>
      </SimpleForm>
    </FormikProvider>
  )
}
