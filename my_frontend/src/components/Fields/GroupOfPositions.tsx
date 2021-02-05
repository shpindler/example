import { FormikTextField, TextFieldProps } from '@/components/TextField'
import React from 'react'

export interface GroupOfPositionsFieldProps
  extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const GroupOfPositionsField: React.ForwardRefExoticComponent<GroupOfPositionsFieldProps> = React.forwardRef(
  function GroupOfPositionsField_(
    { name = 'groupOfPositions', label = 'Группа должностей', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="group-of-positions"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
