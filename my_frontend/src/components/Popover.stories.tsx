import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Popover, PopoverProps } from './Popover'

export default {
  title: 'Popover',
  component: Popover,
} as Meta

const Template: Story<PopoverProps> = (args) => <Popover {...args} />

export const Default = Template.bind({})
Default.args = {
  children: 'Hi, I am a popover.',
}
Default.argTypes = {}
