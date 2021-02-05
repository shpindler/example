import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CalendarIcon, CalendarIconProps } from './Calendar'

export default {
  title: 'Icons/Calendar',
  component: CalendarIcon,
} as Meta

const Template: Story<CalendarIconProps> = (args) => <CalendarIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
