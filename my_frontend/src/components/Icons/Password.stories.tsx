import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { PasswordIcon, PasswordIconProps } from './Password'

export default {
  title: 'Icons/Password',
  component: PasswordIcon,
} as Meta

const Template: Story<PasswordIconProps> = (args) => <PasswordIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
