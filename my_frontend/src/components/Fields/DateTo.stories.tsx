import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DateToField, DateToFieldProps } from './DateTo'

export default {
  title: 'Fields/DateTo',
  component: DateToField,
} as Meta

const Template: Story<DateToFieldProps> = (args) => <DateToField {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
