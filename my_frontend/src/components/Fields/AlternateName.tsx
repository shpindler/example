import { FormikTextField, TextFieldProps } from '@/components/TextField'
import React from 'react'

export interface AlternateNameFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const AlternateNameField: React.ForwardRefExoticComponent<AlternateNameFieldProps> = React.forwardRef(
  function AlternateNameField_(
    { name = 'alternateName', label = 'Услуга', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="alternate-name"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
