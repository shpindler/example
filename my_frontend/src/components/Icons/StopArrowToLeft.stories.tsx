import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import {
  StopArrowToLeftIcon,
  StopArrowToLeftIconProps,
} from './StopArrowToLeft'

export default {
  title: 'Icons/StopArrowToLeft',
  component: StopArrowToLeftIcon,
} as Meta

const Template: Story<StopArrowToLeftIconProps> = (args) => (
  <StopArrowToLeftIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
