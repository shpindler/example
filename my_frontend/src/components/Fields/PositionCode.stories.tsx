import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PositionCodeField, PositionCodeFieldProps } from './PositionCode'

export default {
  title: 'Fields/PositionCode',
  component: PositionCodeField,
} as Meta

const Template: Story<PositionCodeFieldProps> = (args) => (
  <PositionCodeField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
