import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  DeviceEventSkipField,
  DeviceEventSkipFieldProps,
} from './DeviceEventSkip'

export default {
  title: 'Fields/DeviceEventSkip',
  component: DeviceEventSkipField,
} as Meta

const Template: Story<DeviceEventSkipFieldProps> = (args) => (
  <DeviceEventSkipField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
