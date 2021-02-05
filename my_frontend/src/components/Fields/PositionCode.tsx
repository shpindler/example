import { FormikTextField, TextFieldProps } from '@/components/TextField.tsx'
import { messages } from '@/utils/validators'
import React from 'react'
import * as Yup from 'yup'

export interface PositionCodeFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const PositionCodeValidationSchema = Yup.string().typeError(
  messages.string,
)

export const PositionCodeField: React.ForwardRefExoticComponent<PositionCodeFieldProps> = React.forwardRef(
  function PositionCodeField_(
    { name = 'externalCode', label = 'Внешний код', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="position-code"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
