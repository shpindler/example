import { WorkCodesURLParams, useWorkCodesList } from '@/api/work-codes'
import { FormikSelect, FormikSelectProps } from '@/components/Select'
import { WorkCode } from '@/models/work-code'
import React from 'react'
import * as Yup from 'yup'

export type WorkCodeOption = WorkCode

export interface WorkCodeFieldProps
  extends Partial<FormikSelectProps<string, WorkCode>> {
  queryParams?: WorkCodesURLParams
}

export const workCodeValidation = Yup.string()

export const WorkCodeField = React.forwardRef<
  HTMLInputElement,
  WorkCodeFieldProps
>(function WorkCodeField_(
  {
    name = 'workCode',
    label = 'Клиент',
    queryParams,
    options,
    valueKey = 'id',
    labelKey = 'name',
    ...otherProps
  },
  ref,
) {
  const { data, isLoading, error } = useWorkCodesList(queryParams)

  return (
    <FormikSelect
      data-test-id="office"
      inputRef={ref}
      name={name}
      label={label}
      valueKey={valueKey}
      labelKey={labelKey}
      options={options || data}
      error={error && error.toString()}
      loading={isLoading}
      {...otherProps}
    />
  )
})
