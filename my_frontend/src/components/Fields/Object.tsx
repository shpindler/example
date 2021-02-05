import { OfficeField, OfficeFieldProps } from '@/components/Fields/Office'
import React from 'react'

export interface ObjectFieldProps extends OfficeFieldProps {}

export const ObjectField = React.forwardRef<HTMLInputElement, ObjectFieldProps>(
  function ObjectField_({ label = 'Объект', ...otherProps }, ref) {
    return <OfficeField ref={ref} label={label} {...otherProps} />
  },
)
