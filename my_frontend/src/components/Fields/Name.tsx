import { FormikTextField, TextFieldProps } from '@/components/TextField.tsx'
import React from 'react'

export interface NameFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const NameField: React.ForwardRefExoticComponent<NameFieldProps> = React.forwardRef(
  function NameField_(
    { name = 'name', label = 'Ваше имя', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField ref={ref} name={name} label={label} {...otherProps} />
    )
  },
)
