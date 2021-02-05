import {
  DeviceEvent,
  DeviceEventEmployee,
  DeviceEventOffice,
} from '@/models/device-event'
import { WorkCode } from '@/models/work-code'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DeviceEventForm, DeviceEventFormProps } from './DeviceEvent'

export default {
  title: 'Forms/DeviceEvent',
  component: DeviceEventForm,
} as Meta

const Template: Story<DeviceEventFormProps> = (args) => (
  <DeviceEventForm {...args} />
)

export const Default = Template.bind({})
Default.args = {
  initialValues: new DeviceEvent({
    employee: new DeviceEventEmployee({
      id: '1',
      name: 'Агафонова Оксана Васильевна',
    }),
    office: new DeviceEventOffice({ id: '2', name: 'Купертино' }),
    deviceName: 'iPhone 12 Pro',
    mode: 1,
    workCode: new WorkCode({ name: 'Work Code', id: '1' }),
    comment: 'Comment',
  }),
}
Default.argTypes = {}
