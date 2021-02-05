import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DateFromField, DateFromFieldProps } from './DateFrom'

export default {
  title: 'Fields/DateFromField',
  component: DateFromField,
} as Meta

const Template: Story<DateFromFieldProps> = (args) => (
  <DateFromField {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
