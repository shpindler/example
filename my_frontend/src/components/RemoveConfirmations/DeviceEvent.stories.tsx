import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  RemoveDeviceEventConfirmation,
  RemoveDeviceEventConfirmationProps,
} from './DeviceEvent'

export default {
  title: 'RemoveConfirmations/DeviceEvent',
  component: RemoveDeviceEventConfirmation,
} as Meta

const Template: Story<RemoveDeviceEventConfirmationProps> = (args) => (
  <RemoveDeviceEventConfirmation {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
