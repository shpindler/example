import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CrossIcon, CrossIconProps } from './Cross'

export default {
  title: 'Icons/Cross',
  component: CrossIcon,
} as Meta

const Template: Story<CrossIconProps> = (args) => <CrossIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
