import { Select, SelectProps } from '@/components/Select'
import { NumberParser } from '@/models/parser'
import { useQueryParam, useQueryParamResult } from '@/utils/query-params'
import React from 'react'

export interface PageSizeFieldProps
  extends Partial<Omit<SelectProps<number>, 'onChange'>>,
    Pick<SelectProps<number>, 'onChange'> {}

export const pageSizeFieldOptions = [
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]

export function PageSizeField({
  name = 'pageSize',
  label = 'Отображать по',
  options = pageSizeFieldOptions,
  valueKey = 'value',
  labelKey = 'label',
  ...otherProps
}: PageSizeFieldProps): JSX.Element {
  return (
    <Select
      data-test-id="pageSize"
      name={name}
      label={label}
      options={options}
      valueKey={valueKey}
      labelKey={labelKey}
      {...otherProps}
    />
  )
}

export const getPageSizeParser = (
  options = [10, 25, 50, 100],
  defaultValue = 10,
): NumberParser =>
  new NumberParser(defaultValue, (value) => options.includes(value))

export interface usePageSizeQueryParamsParams {
  options?: number[]
  defaultValue?: number
}

export function usePageSizeQueryParam({
  options,
  defaultValue,
}: usePageSizeQueryParamsParams): useQueryParamResult<number> {
  return useQueryParam({
    param: 'page_size',
    parser: getPageSizeParser(options, defaultValue),
    clearParamFromURLIf: (value) => value === defaultValue,
  })
}
