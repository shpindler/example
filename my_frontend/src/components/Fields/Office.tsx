import { OfficesURLParams, useOfficesList } from '@/api/offices'
import { FormikSelect, FormikSelectProps } from '@/components/Select'
import { Office } from '@/models/office'
import React from 'react'

export type OfficeOption = Office

export interface OfficeFieldProps
  extends Partial<FormikSelectProps<string, OfficeOption>> {
  queryParams: OfficesURLParams
}

export const OfficeField = React.forwardRef<HTMLInputElement, OfficeFieldProps>(
  function OfficeField_(
    {
      name = 'office',
      label = 'Офис',
      queryParams,
      options,
      valueKey = 'id',
      labelKey = 'name',
      ...otherProps
    },
    ref,
  ) {
    const { data, isLoading, error } = useOfficesList(queryParams)

    return (
      <FormikSelect
        data-test-id="office"
        inputRef={ref}
        name={name}
        label={label}
        valueKey={valueKey}
        labelKey={labelKey}
        options={options || (data && data.data)}
        error={error && error.toString()}
        loading={isLoading}
        {...otherProps}
      />
    )
  },
)
