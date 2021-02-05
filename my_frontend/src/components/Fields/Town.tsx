import { FormikTextField, TextFieldProps } from '@/components/TextField.tsx'
import React from 'react'

export interface TownFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const TownField: React.ForwardRefExoticComponent<TownFieldProps> = React.forwardRef(
  function TownField_({ name = 'town', label = 'Город', ...otherProps }, ref) {
    return (
      <FormikTextField ref={ref} name={name} label={label} {...otherProps} />
    )
  },
)
