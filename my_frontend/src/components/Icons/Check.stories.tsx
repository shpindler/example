import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { CheckIcon, CheckIconProps } from './Check'

export default {
  title: 'Icons/Check',
  component: CheckIcon,
} as Meta

const Template: Story<CheckIconProps> = (args) => <CheckIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
