import { DeviceEvent, DeviceEventEmployee } from '@/models/device-event'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DeviceEventShortInfo, DeviceEventShortInfoProps } from './DeviceEvent'

export default {
  title: 'ShortInfo/DeviceEvent',
  component: DeviceEventShortInfo,
} as Meta

const Template: Story<DeviceEventShortInfoProps> = (args) => (
  <DeviceEventShortInfo {...args} />
)

export const Default = Template.bind({})
Default.args = {
  instance: new DeviceEvent({
    employee: new DeviceEventEmployee({ name: 'Агафонова Оксана Васильевна' }),
  }),
}
Default.argTypes = {}
