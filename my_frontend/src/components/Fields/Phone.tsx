import { FormikTextField, TextFieldProps } from '@/components/TextField.tsx'
import React from 'react'

export interface PhoneFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const PhoneField: React.ForwardRefExoticComponent<PhoneFieldProps> = React.forwardRef(
  function PhoneField_(
    {
      type = 'tel',
      name = 'phone',
      label = 'Телефон',
      inputMode = 'tel',
      mask = '+7 (999) 999-99-99',
      ...otherProps
    },
    ref,
  ) {
    return (
      <FormikTextField
        ref={ref}
        type={type}
        name={name}
        label={label}
        inputMode={inputMode}
        mask={mask}
        {...otherProps}
      />
    )
  },
)
