import { DeviceEvent, DeviceEventEmployee } from '@/models/device-event'
import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DeviceEventActionList, DeviceEventActionListProps } from './ActionList'

export default {
  title: 'ListItems/DeviceEvent/ActionList',
  component: DeviceEventActionList,
} as Meta

const Template: Story<DeviceEventActionListProps> = (args) => (
  <DeviceEventActionList {...args} />
)

export const Default = Template.bind({})
Default.args = {
  instance: new DeviceEvent({
    employee: new DeviceEventEmployee({ name: 'I am employee' }),
  }),
}
Default.argTypes = {}
