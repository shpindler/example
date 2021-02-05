import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { WarningIcon, WarningIconProps } from './Warning'

export default {
  title: 'Icons/Warning',
  component: WarningIcon,
} as Meta

const Template: Story<WarningIconProps> = (args) => <WarningIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
