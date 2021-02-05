import {
  DefaultSelectOption,
  FormikSelect,
  SelectProps,
} from '@/components/Select'
import TIMEZONES from '@/utils/timezones.json'
import { tz } from 'moment-timezone'
import React from 'react'

export interface TimezoneProps extends Partial<SelectProps<string>> {}

export type TimezoneOption = DefaultSelectOption<string>

export const timezones: TimezoneOption[] = TIMEZONES.data.map((name) => ({
  label: `(GMT${tz(name).format('Z')}) ${name}`,
  value: name,
}))

export const TimezoneField = React.forwardRef(function Timezone_(
  {
    name = 'timezone',
    label = 'Часовой пояс',
    searchable = true,
    searchLookups = {
      label: (search, value) =>
        value.toLowerCase().includes(search.toLowerCase()),
    },
    valueKey = 'value',
    labelKey = 'label',
    ...otherProps
  }: TimezoneProps,
  ref: React.Ref<HTMLInputElement>,
) {
  return (
    <FormikSelect<string, TimezoneOption>
      name={name}
      inputRef={ref}
      label={label}
      options={timezones}
      searchable={searchable}
      searchLookups={searchLookups}
      valueKey={valueKey}
      labelKey={labelKey}
      {...otherProps}
    />
  )
})
