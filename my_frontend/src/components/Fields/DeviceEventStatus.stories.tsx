import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  DeviceEventStatusField,
  DeviceEventStatusFieldProps,
} from './DeviceEventStatus'

export default {
  title: 'Fields/DeviceEventStatus',
  component: DeviceEventStatusField,
} as Meta

const Template: Story<DeviceEventStatusFieldProps<never>> = (args) => (
  <DeviceEventStatusField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
