import { Meta, Story } from '@storybook/react/types-6-0'
import React from 'react'

import { FingerPrintIcon, FingerPrintIconProps } from './FingerPrint'

export default {
  title: 'Icons/FingerPrint',
  component: FingerPrintIcon,
} as Meta

const Template: Story<FingerPrintIconProps> = (args) => (
  <FingerPrintIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {}
Default.argTypes = {}
