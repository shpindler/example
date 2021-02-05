import { CheckboxProps, FormikCheckbox } from '@/components/Checkbox'
import React from 'react'

export interface DeviceEventSkipFieldProps extends Omit<CheckboxProps, 'name'> {
  name?: string
}

export const DeviceEventSkipField: React.ForwardRefExoticComponent<DeviceEventSkipFieldProps> = React.forwardRef(
  function DeviceEventSkipField_(
    { name = 'skip', label = 'Не учитывать отметку в расчётах', ...otherProps },
    ref,
  ) {
    return (
      <FormikCheckbox ref={ref} name={name} label={label} {...otherProps} />
    )
  },
)
