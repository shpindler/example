import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { Alert, AlertProps } from './Alert'

export default {
  title: 'Alert',
  component: Alert,
} as Meta

const Template: Story<AlertProps> = (args) => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
