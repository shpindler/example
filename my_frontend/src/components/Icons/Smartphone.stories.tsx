import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { SmartphoneIcon, SmartphoneIconProps } from './Smartphone'

export default {
  title: 'Icons/Smartphone',
  component: SmartphoneIcon,
} as Meta

const Template: Story<SmartphoneIconProps> = (args) => (
  <SmartphoneIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
