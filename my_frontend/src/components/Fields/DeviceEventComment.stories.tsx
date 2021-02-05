import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  DeviceEventCommentField,
  DeviceEventCommentFieldProps,
} from './DeviceEventComment'

export default {
  title: 'Fields/DeviceEventComment',
  component: DeviceEventCommentField,
} as Meta

const Template: Story<DeviceEventCommentFieldProps> = (args) => (
  <DeviceEventCommentField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
