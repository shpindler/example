import { FormikTextField, TextFieldProps } from '@/components/TextField'
import React from 'react'

export interface EmailFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const EmailField: React.ForwardRefExoticComponent<EmailFieldProps> = React.forwardRef(
  function EmailField_(
    { type = 'email', name = 'email', label = 'E-mail', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        ref={ref}
        type={type}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
