import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ClockDisplay, ClockDisplayProps } from './ClockDisplay'

export default {
  title: 'ClockDisplay',
  component: ClockDisplay,
} as Meta

const Template: Story<ClockDisplayProps> = (args) => <ClockDisplay {...args} />

export const Default = Template.bind({})
Default.args = {
  timestamp: new Date(1993, 6, 18, 22, 55).getTime(),
}
Default.argTypes = {
  timestamp: {
    control: { type: 'date' },
  },
  date: {
    control: null,
  },
}
