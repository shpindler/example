import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PositionRateField, PositionRateFieldProps } from './PositionRate'

export default {
  title: 'Fields/PositionRate',
  component: PositionRateField,
} as Meta

const Template: Story<PositionRateFieldProps> = (args) => (
  <PositionRateField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
