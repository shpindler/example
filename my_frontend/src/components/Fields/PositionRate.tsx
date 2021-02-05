import { FormikTextField, TextFieldProps } from '@/components/TextField'
import { messages } from '@/utils/validators'
import React from 'react'
import * as Yup from 'yup'

export interface PositionRateFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const PositionRateValidationSchema = Yup.number().typeError(
  messages.number,
)

export const PositionRateField: React.ForwardRefExoticComponent<PositionRateFieldProps> = React.forwardRef(
  function PositionRateField(
    { name = 'rate', label = 'Ставка', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="position-rate"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
