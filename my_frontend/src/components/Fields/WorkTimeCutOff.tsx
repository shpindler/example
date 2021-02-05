import { FormikSelect, FormikSelectProps } from '@/components/Select'
import React from 'react'

export interface WorkTimeCutOffFieldProps
  extends Partial<FormikSelectProps<number>> {}

export const workTimeCutOffFieldOptions = [
  { label: 'Отключён', value: 0 },
  { label: 'Не учитывать время до начала рабочего дня', value: 3 },
  {
    label: 'Не учитывать время до начала и после окончания рабочего дня',
    value: 2,
  },
  { label: 'Не учитывать переработку', value: 1 },
]

export const WorkTimeCutOffField = React.forwardRef<
  HTMLInputElement,
  WorkTimeCutOffFieldProps
>(function WorkTimeCutOffField_(
  {
    name = 'workTimeCutOff',
    label = 'Контроль длительности отработанных смен',
    valueKey = 'value',
    labelKey = 'label',
    ...otherProps
  },
  ref,
) {
  return (
    <FormikSelect
      inputRef={ref}
      name={name}
      label={label}
      options={workTimeCutOffFieldOptions}
      valueKey={valueKey}
      labelKey={labelKey}
      {...otherProps}
    />
  )
})
