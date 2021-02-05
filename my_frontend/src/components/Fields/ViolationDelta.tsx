import { FormikTextField, TextFieldProps } from '@/components/TextField'
import { messages } from '@/utils/validators'
import React from 'react'
import * as Yup from 'yup'

export interface ViolationDeltaFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const violationDeltaValidationSchema = Yup.number()
  .typeError(messages.number)
  .integer(messages.integer)
  .min(0, messages.min(0))
  .max(24 * 60, messages.max(24 * 60))

export const ViolationDeltaField: React.ForwardRefExoticComponent<ViolationDeltaFieldProps> = React.forwardRef(
  function ViolationDeltaField_(
    {
      name = 'violationDelta',
      label = 'Не учитывать нарушения менее (мин)',
      ...otherProps
    },
    ref,
  ) {
    return (
      <FormikTextField ref={ref} name={name} label={label} {...otherProps} />
    )
  },
)
