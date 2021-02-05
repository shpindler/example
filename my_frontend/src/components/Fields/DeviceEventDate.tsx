import {
  DateFieldInputProps,
  FormikDateField,
  FormikDateFieldProps,
} from '@/components/DateField'
import React from 'react'

export interface DeviceEventDateFieldProps
  extends Omit<FormikDateFieldProps, 'inputProps'>,
    Omit<React.ComponentProps<'div'>, keyof FormikDateFieldProps> {
  inputProps?: DateFieldInputProps
}

export const DeviceEventDateField: React.FC<DeviceEventDateFieldProps> = ({
  inputProps: {
    name = 'eventDate',
    label = 'Дата и время',
    ...otherInputProps
  } = {},
  ...otherProps
}) => {
  return (
    <FormikDateField
      inputProps={{
        name,
        label,
        ...otherInputProps,
      }}
      {...otherProps}
    />
  )
}
