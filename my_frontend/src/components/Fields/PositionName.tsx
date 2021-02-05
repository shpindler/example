import { FormikTextField, TextFieldProps } from '@/components/TextField.tsx'
import { messages } from '@/utils/validators'
import React from 'react'
import * as Yup from 'yup'

export interface PositionNameFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const PositionNameValidationSchema = Yup.string().typeError(
  messages.string,
)

export const PositionNameField: React.ForwardRefExoticComponent<PositionNameFieldProps> = React.forwardRef(
  function PositionNameField_(
    { name = 'name', label = 'Название', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="position-name"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
