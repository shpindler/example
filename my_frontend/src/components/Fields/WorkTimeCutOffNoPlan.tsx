import { CheckboxProps, FormikCheckbox } from '@/components/Checkbox'
import React from 'react'

export interface WorkTimeCutOffNoPlanFieldProps
  extends Omit<CheckboxProps, 'name'> {
  name?: string
}

export const WorkTimeCutOffNoPlanField: React.ForwardRefExoticComponent<WorkTimeCutOffNoPlanFieldProps> = React.forwardRef(
  function WorkTimeCutOffNoPlanField_(
    {
      name = 'workTimeCutOffNoPlan',
      label = 'Не учитывать смены без плана',
      ...otherProps
    },
    ref,
  ) {
    return (
      <FormikCheckbox ref={ref} name={name} label={label} {...otherProps} />
    )
  },
)
