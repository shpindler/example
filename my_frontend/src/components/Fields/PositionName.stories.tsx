import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PositionNameField, PositionNameFieldProps } from './PositionName'

export default {
  title: 'Fields/PositionName',
  component: PositionNameField,
} as Meta

const Template: Story<PositionNameFieldProps> = (args) => (
  <PositionNameField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
