import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ArrowToLeftIcon, ArrowToLeftIconProps } from './ArrowToLeft'

export default {
  title: 'Icons/ArrowToLeft',
  component: ArrowToLeftIcon,
} as Meta

const Template: Story<ArrowToLeftIconProps> = (args) => (
  <ArrowToLeftIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
