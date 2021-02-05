import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { DotsIcon, DotsIconProps } from './Dots'

export default {
  title: 'Icons/Dots',
  component: DotsIcon,
} as Meta

const Template: Story<DotsIconProps> = (args) => <DotsIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
