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

export interface DateFromFieldProps extends Omit<DateFieldProps, 'inputProps'> {
  inputProps?: PartialKeys<DateFieldInputProps, 'name' | 'label'>
}

export const DateFromField = React.forwardRef<DateFieldRef, DateFromFieldProps>(
  function DateFromField_(
    {
      inputProps: {
        name = 'dateFrom',
        label = 'Дата c',
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

const defaultDateFrom = new Date()
defaultDateFrom.setDate(defaultDateFrom.getDate() - 2)
defaultDateFrom.setHours(0)
defaultDateFrom.setMinutes(0)

export const getDateFromParser = (
  defaultValue = defaultDateFrom,
): DateParser => {
  return new DateParser(defaultValue)
}

export function useDateFromQueryParam(
  defaultValue?: Date,
): useQueryParamResult<Date> {
  return useQueryParam({
    param: 'date_from',
    parser: getDateFromParser(defaultValue),
    clearParamFromURLIf: (value) => isEqual(value, defaultDateFrom),
  })
}
