import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { ExternalIcon, ExternalIconProps } from './External'

export default {
  title: 'Icons/External',
  component: ExternalIcon,
} as Meta

const Template: Story<ExternalIconProps> = (args) => <ExternalIcon {...args} />

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
