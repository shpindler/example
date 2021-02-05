import {
  DefaultSelectOption,
  FormikSelect,
  FormikSelectProps,
} from '@/components/Select'
import { DeviceEventStatus } from '@/models/device-event'
import { DeviceEventDefaultProvider } from '@/providers/device-event'
import React from 'react'
import * as Yup from 'yup'

export type DeviceEventStatusOption = DefaultSelectOption<DeviceEventStatus>

export interface DeviceEventStatusFieldProps<
  ProviderType extends typeof DeviceEventDefaultProvider = typeof DeviceEventDefaultProvider
> extends Partial<FormikSelectProps<DeviceEventStatus>> {
  Provider?: ProviderType
}

export const deviceEventStatusValidation = Yup.number()

export const DeviceEventStatusField = React.forwardRef<
  HTMLInputElement,
  DeviceEventStatusFieldProps
>(function DeviceEventStatusField_(
  {
    name = 'status',
    label = 'Статус',
    options = [],
    Provider = DeviceEventDefaultProvider,
    valueKey = 'value',
    labelKey = 'label',
    ...otherProps
  },
  ref,
) {
  const _options: DeviceEventStatusOption[] = options

  if (!options.length) {
    for (const status in Provider.statusTexts) {
      if (Object.prototype.hasOwnProperty.call(Provider.statusTexts, status)) {
        _options.push({
          label: Provider.statusTexts[status],
          value: parseInt(status),
        })
      }
    }
  }

  return (
    <FormikSelect
      data-test-id="deviceEventStatus"
      inputRef={ref}
      name={name}
      label={label}
      options={_options}
      valueKey={valueKey}
      labelKey={labelKey}
      {...otherProps}
    />
  )
})
