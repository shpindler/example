import { FormikTextField, TextFieldProps } from '@/components/TextField'
import React from 'react'

export interface GroupNameFieldProps extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const GroupNameField: React.ForwardRefExoticComponent<GroupNameFieldProps> = React.forwardRef(
  function GroupNameField_(
    { name = 'groupName', label = 'Отнести к подразделению', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="group-name"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
