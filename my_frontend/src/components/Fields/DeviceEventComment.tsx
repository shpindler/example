import { FormikTextField, TextFieldProps } from '@/components/TextField'
import React from 'react'

export interface DeviceEventCommentFieldProps
  extends Omit<TextFieldProps, 'name'> {
  name?: string
}

export const DeviceEventCommentField: React.FC<DeviceEventCommentFieldProps> = React.forwardRef(
  function DeviceEventCommentField_(
    { name = 'comment', label = 'Комментарий', ...otherProps },
    ref,
  ) {
    return (
      <FormikTextField
        data-test-id="device-event-comment"
        ref={ref}
        name={name}
        label={label}
        {...otherProps}
      />
    )
  },
)
