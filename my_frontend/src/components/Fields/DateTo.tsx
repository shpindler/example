import {
  DateField,
  DateFieldInputProps,
  DateFieldProps,
  DateFieldRef,
} from '@/components/DateField'
import { DateParser } from '@/models/parser'
import { PartialKeys } from '@/types'
import { useQueryParam, useQueryParamResult } from '@/utils/query-params'
import { isEqual } from 'date-fns'
import React from 'react'

export interface DateToFieldProps extends Omit<DateFieldProps, 'inputProps'> {
  inputProps?: PartialKeys<DateFieldInputProps, 'name' | 'label'>
}

export const DateToField = React.forwardRef<DateFieldRef, DateToFieldProps>(
  function DateToField_(
    {
      inputProps: {
        name = 'dateTo',
        label = 'Дата по',
        ...otherInputProps
      } = {},
      ...otherProps
    },
    ref,
  ) {
    return (
      <DateField
        ref={ref}
        inputProps={{
          name,
          label,
          ...otherInputProps,
        }}
        {...otherProps}
      />
    )
  },
)

const defaultDateTo = new Date()

export const getDateToParser = (defaultValue = defaultDateTo): DateParser =>
  new DateParser(defaultValue)

export function useDateToQueryParam(
  defaultValue?: Date,
): useQueryParamResult<Date> {
  return useQueryParam({
    param: 'date_to',
    parser: getDateToParser(defaultValue),
    clearParamFromURLIf: (value) => isEqual(value, defaultDateTo),
  })
}
